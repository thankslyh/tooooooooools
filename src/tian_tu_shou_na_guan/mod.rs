use std::env::current_dir;
use std::fs;
use std::fs::{File, OpenOptions};
use std::io::Write;
use anyhow::Error;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::thread;
use std::future::Future;
use async_recursion::async_recursion;
use futures::future::BoxFuture;
use futures::FutureExt;
use url::{Url, UrlQuery};

const FILE_NAME: &'static str = "tian_tu_shou_na_guan.txt";

type Result<T> = anyhow::Result<T>;

struct Info {
    next: Option<String>,
    list: Vec<String>,
}

impl Info {
    pub async fn write_file(&self) -> Result<()> {
        let home_dir = current_dir().unwrap();
        println!("{:?}", home_dir);
        let file = home_dir.join(FILE_NAME);
        let mut f = match fs::metadata(&file) {
            Ok(_) => OpenOptions::new().write(true).read(true).open(&file).unwrap(),
            Err(_) => File::create(&file).unwrap(),
        };
        for str in self.list.clone().into_iter() {
            f.write(str.as_bytes()).expect("写入错误");
        }
        Ok(())
    }
}

struct WxUrl<'a>(&'a str);

#[derive(Deserialize, Serialize)]
struct ReqForm<'a> {
    __biz: &'a str,
    mid: isize,
    album_id: i64,
    cur_album_id: i64,
}

#[derive(Deserialize, Serialize, Debug)]
struct ResData {
    pub appmsg_album_extinfo: ExtInfo,
}

#[derive(Deserialize, Serialize, Debug)]
struct ExtInfo {
    pub next_article_link: String,
}

impl<'a> WxUrl<'a> {
    fn new(url: &'a str) -> Self {
        WxUrl(url)
    }

    #[async_recursion]
    async fn start(&self) {
        let html = self.get_html().await;
        let id = self.get_album_id(&html).parse::<i64>().unwrap();
        let img_list = self.get_images(&html);
        let biz= self.get_biz(&html);
        let binding = Url::parse(&biz).unwrap();
        let mut p = binding.query_pairs();
        let biz_query = p.find(|x| x.0.eq("__biz"));
        let mid_query = p.find(|x| x.0.eq("mid"));
        let biz = biz_query.clone().unwrap().1;
        let mid = mid_query.clone().unwrap().1.parse::<isize>().unwrap();
        let info = Info {
            next: self.get_next_url(id, &biz, mid).await,
            list: img_list
        };
        info.write_file().await.unwrap();
        if let Some(next_url) = info.next.clone() {
            let wx = WxUrl(&next_url);
            wx.start().await;
        }
    }

    fn get_biz(&self, text: &'a str) -> String {
        let doc = scraper::Html::parse_document(&text);
        let selector = scraper::Selector::parse("meta").unwrap();
        let mut metas = doc.select(&selector);
        let target = metas.find(|x| {
            if let Some(pro) = x.value().attr("property") {
                if pro.eq("og:url") {
                    return true
                }
            }
            return false
        }).unwrap();
        target.value().attr("content").unwrap().to_string()
    }

    async fn get_html(&self) -> String {
        let req = reqwest::Client::new();
        let text = req.get(self.0)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
        text
    }

    fn get_album_id(&self, text: &str) -> String {
        let album_id_reg = Regex::new(r"albumId:\s*'(\d+)'").unwrap();
        let res = album_id_reg.captures(&text).unwrap();
        let res = res.get(1).unwrap().as_str();
        res.to_string()
    }

    async fn get_next_url(&self, album_id: i64, biz: &str, mid: isize) -> Option<String> {
        let req = reqwest::Client::new();
        let req_data = format!("__biz={}&mid={}&cur_album_id={}&album_id={}&idx={}", biz, mid, album_id, 0x11fd1c7c75070000, 2);
        let res = req.post(format!("https://mp.weixin.qq.com/mp/getappmsgext?__biz={}", biz))
            .body(req_data)
            .send()
            .await
            .unwrap()
            .json::<ResData>()
            .await
            .unwrap();
        println!("{:?}", res);
        Some(res.appmsg_album_extinfo.next_article_link)
    }

    fn get_images(&self, text: &str) -> Vec<String> {
        let doc = scraper::Html::parse_document(&text);
        let selector = scraper::Selector::parse("p>img.wxw-img").unwrap();
        let images = doc.select(&selector);
        let mut img_list = Vec::new();
        images.for_each(|x| {
            let url = x.value().attr("data-src");
            if let Some(s) = url {
                img_list.push(s.to_string() + "\n")
            }
        });
        img_list
    }
}

#[cfg(test)]
mod tests {
    use crate::tian_tu_shou_na_guan::{Info, WxUrl};

    #[test]
    fn write_test() {
        // let info = Info {
        //     next: "ascascasc",
        //     list: vec!["123123\n", "123123\n", "1231231\n"],
        // };
        // info.write_file().expect("")
    }

    #[tokio::test]
    async fn test_start() {
        let wx = WxUrl("https://mp.weixin.qq.com/s?__biz=MzkyNDQ1ODY4OQ==&mid=2247484148&idx=2&sn=53bd9072a32c2f29f445b04035f19fad&chksm=c1d4c95af6a3404c26500127210babcbc5341a98246e74fe6abb1a08ae82d86fbfe03d819a59&cur_album_id=2853683810448998400&scene=190#rd");
        wx.start().await
    }
}