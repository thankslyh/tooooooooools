extern crate url;

use std::collections::HashMap;
use std::ops::Add;
use std::time::{Duration, SystemTime};
use chrono::{Datelike, DateTime, Local, Timelike};
use reqwest::Client;
use reqwest::header::{HeaderMap, HeaderValue};
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::pdl_qianggou::{create_d_track_data, create_headers, LOGIN_ID, SESSION_ID, STORE_ID, TICKET_NAME, TOKEN};
use crate::pdl_qianggou::get_address::Address;
use crate::pdl_qianggou::get_car_info::CarInfo;
use crate::pdl_qianggou::get_mini_info::get_mini_info;

fn create_time() -> (String, String, String) {
    let get_a = |x: u32| -> u32 {
        let a = x % 5;
        x - a
    };
    let mut start_time = Local::now().add(Duration::from_secs(30 * 60));
    let day = format!("{}-{}-{}", start_time.year(), start_time.month(), start_time.day());
    if start_time.hour() < 10 {
        let start_time = "10:00".to_string();
        let end_time = "10:30".to_string();
        return (day, start_time, end_time)
    }
    let end_time = start_time.add(Duration::from_secs(30 * 60));
    let start_time = format!("{}:{}", start_time.hour(), get_a(start_time.minute()));
    let end_time = format!("{}:{}", end_time.hour(), get_a(end_time.minute()));
    (day, start_time, end_time)
}

fn create_submit_param(addr: Address, car_info: CarInfo, ship_time: String) -> String {
    let date = create_time();
    json!({
  "terminal": "devtools",
  "platform": "9",
  "channel": "miniprograms",
  "loginId": LOGIN_ID,
  "deviceId": "CABFDC89FA600002A2243113F9D09DF01716193181646",
  "v": "v5.3.4",
  "appVersion": "5.3.4",
  "venderId": 67242,
  "vendorId": 67242,
  "source": 9,
  "addressContentStr": {
    "addressId": addr.id,
    "areaId": 411081,
    "name": addr.consignee,
    "phone": addr.mobil_phone,
    "addressPrefix": addr.address_name,
    "addressDetail": addr.address_detail,
    "latitude": addr.latitude,
    "longitude": addr.longitude,
    "amapId": addr.amap_id,
    "addressLocated": addr.address_located
  },
  "shipmentContentStr": {
    "shipmentType": 1,
    "shipmentDate": date.0,
    "shipmentTime": ship_time,
    "shipmentOption": 6000
  },
  "remark": null,
  "afterPromotionPrice": car_info.discount_price_for_user,
  "wareTotalNum": car_info.checked_count_without_gift,
  "couponCodeList": [],
  "invoiceContentStr": {
    "addressAndPhone": "",
    "bank": "",
    "bankAccount": "",
    "contactNumber": "",
    "recipient": "",
    "invoiceFlag": 0,
    "invoiceTitle": "",
    "invoiceContentType": 1,
    "invoiceContent": "",
    "invoiceType": null,
    "invoiceContentCode": null,
    "invoiceAddress": "",
    "taxNum": ""
  },
  "isUseCovert": 1,
  "tipCode": "",
  "needPopPwd": false,
  "storeId": STORE_ID,
  "tradeConfId": "miniprogramo2o",
  "settlementPenetrateStoreVOStr": {
    "checked_sum_without_gift": car_info.checked_sum_without_gift,
    "orderSaleType": 1,
    "preSaleTagGroup": 0,
    "totalOriginPrice": car_info.discount_price_for_user
  },
  "onlyPick": "false",
  "token": TOKEN,
  "equipmentNo": "CABFDC89FA600002A2243113F9D09DF01716193181646",
  "pubParam": {
    "dSource": ""
  },
  "useAppAddressStyle": true
}).to_string()
}
pub async fn submit(addr: Address, car_info: CarInfo) {
    let req = Client::new();
    let time = get_mini_info(addr.clone(), car_info.clone()).await;
    let param = create_submit_param(addr, car_info, time);
    let d_track_str = create_d_track_data();
    let headers = create_headers("trade.dmall-os.cn".to_string());
    let mut form = HashMap::new();
    form.insert("param", param);
    form.insert("d_track_data", d_track_str);
    // println!("{:#?}", params);
    println!("{:#?}", headers);
    let res = req.post("https://trade.dmall-os.cn/trade/gate/mini/submit")
        .headers(headers)
        .form(&form)
        .send()
        .await
        .unwrap()
        .text()
        .await
        .unwrap();
    //
    print!("结果：{:#?}", res);
    // println!("{:#?}", )
}

#[cfg(test)]
mod tests {
    use std::ops::Add;
    use std::time::{Duration, SystemTime};
    use chrono::{Datelike, Local, Timelike, Utc};
    use crate::pdl_qianggou::{add_shop_car, get_address, get_car_info, submit};
    use crate::pdl_qianggou::get_mini_info::get_mini_info;
    use crate::pdl_qianggou::submit::{create_time, submit};

    #[tokio::test]
    async fn test_time() {
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
    }
}
