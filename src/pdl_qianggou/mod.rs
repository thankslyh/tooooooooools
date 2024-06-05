use chrono::{Local, Utc};
use reqwest::header::{HeaderMap, HeaderValue};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tokio_cron_scheduler::{Job, JobScheduler, JobSchedulerError};
#[recursion_limit = "256"]

pub mod submit;
// mod submit_lyh;
mod get_address;
mod config;
mod add_shop_car;
mod get_car_info;
mod get_mini_info;

pub const TICKET_NAME: &'static str = "07DD83BE5A16903395994F30842E0C86A0263CDDAD285430BBCD9746067919F31F8306692347EC5CC282A5DC04EE3E6668CFF0EA423913B75BC83921CCABAF1BF18317BA164018CE1F2F12F5F7999F4427B71457B259EBCF13772902F65DEAB17451AD8602921370B97BF54A697EC9745159380F79BF6C57A0A5C38CE65BB59C";
pub const TOKEN: &'static str = "fe3992d2-071a-4051-842d-b689968e8b93";
pub const STORE_ID: i64 = 668602;

pub const SESSION_ID: &'static str = "CAC3186C5E600002E4AC16DC15C4176D1717061281294";

pub const LOGIN_ID: &'static str = "307d270b-2445-4822-99c9-85258e360101";

pub const STORE_GROUP_KEY: &'static str = "639f9d111b7bb674b35a0783daebae9d@MS02Njg2MDItNjcyNDI";

pub const DEVICE_ID: &'static str = "CABFDC89FA600002A2243113F9D09DF01716193181646";

pub const USER_ID: i64 = 1534279808;

#[derive(Debug, Deserialize, Serialize)]
pub struct BaseResp<T> {
    code: String,
    data: T,
}
pub fn create_headers(host: String) -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert("Host", host.parse().unwrap());
    headers.insert("clientType", HeaderValue::from(1));
    headers.insert("grayVenderId", HeaderValue::from(67242));
    headers.insert("mixFlag", HeaderValue::from(1));
    headers.insert("v", "v5.3.4".parse().unwrap());
    headers.insert("originBusinessFormat", HeaderValue::from(1));
    headers.insert("scene", "o2o".parse().unwrap());
    headers.insert("userId", HeaderValue::from(USER_ID));
    headers.insert("networkType", HeaderValue::from(0));
    headers.insert("grayStoreId", HeaderValue::from(STORE_ID));
    headers.insert("appletType", HeaderValue::from(62));
    headers.insert("channel", "miniprograms".parse().unwrap());
    headers.insert("uniqueCode", "pdl_wx".parse().unwrap());
    headers.insert("latitude", "40.01219562070234".parse().unwrap());
    headers.insert("deliveryLat", "34.17114".parse().unwrap());
    headers.insert("areaId", HeaderValue::from(374));
    headers.insert("areaCode", HeaderValue::from(411081));
    headers.insert("longitude", "40.01219562070234".to_string().parse().unwrap());
    headers.insert("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) XWEB/1191".parse().unwrap());
    // headers.insert("Content-Type", "application/x-www-form-urlencoded".parse().unwrap());
    headers.insert("ticketName", TICKET_NAME.parse().unwrap());
    headers.insert("dmTenantId", HeaderValue::from(42));
    headers.insert("venderId", HeaderValue::from(67242));
    headers.insert("businessCode", HeaderValue::from(1));
    headers.insert("deliveryLng", "113.494708".parse().unwrap());
    // 每个人不一样
    headers.insert("storeGroupKey", STORE_GROUP_KEY.parse().unwrap());
    headers.insert("xweb_xhr", HeaderValue::from(1));
    headers.insert("platform", HeaderValue::from(9));
    headers.insert("token", TOKEN.parse().unwrap());
    headers.insert("storeId", HeaderValue::from(STORE_ID));
    headers.insert("appVersion", "5.3.4".parse().unwrap());
    headers.insert("Referer", "https://servicewechat.com/wx9572d0552dfc7579/43/page-frame.html".parse().unwrap());
    headers
}

pub fn create_d_track_data() -> String {
    json!({"session_id":SESSION_ID,"project":"pangdonglai_mini","tdc":"","tpc":"","uuid":DEVICE_ID,"env":"minip"}).to_string()
}

pub async fn start_job() -> Result<(), JobSchedulerError> {
    let sched = JobScheduler::new().await?;
    sched.add(
        Job::new_async("0 06 08 * * *", |_uuid, _l| {
            Box::pin(async {
                println!("I run every 10 seconds, now is {}", Local::now().format("%d/%m/%Y %H:%M"));
                // 第一步：添加购物车
                println!("开始向购物车添加商品......");
                add_shop_car::add_shop_car(199547762).await.unwrap();
                add_shop_car::add_shop_car(199547762).await.unwrap();
                println!("获取购物车详情......");
                let car_info = get_car_info::get_car_info().await;
                println!("获取地址信息......");
                let addr = get_address::get_address().await;
                println!("car_info:{:#?}", car_info);
                println!("addr:{:#?}", addr);
                println!("开始下单......");
                submit::submit(addr, car_info).await
                // submit::submit().await
            })
        })?
    ).await?;
    sched.start().await?;
    loop {}
    Ok(())
}