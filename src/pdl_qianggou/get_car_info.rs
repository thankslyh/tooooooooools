use std::collections::HashMap;
use chrono::Local;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::pdl_qianggou::{create_d_track_data, create_headers, LOGIN_ID, STORE_ID, DEVICE_ID, BaseResp};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CarInfo {
  #[serde(rename = "checkedCountWithoutGift")]
  pub checked_count_without_gift: i8,
  #[serde(rename = "discountPriceForUser")]
  pub discount_price_for_user: i64,
  #[serde(rename="checkedSumWithoutGift")]
  pub checked_sum_without_gift: i8,
}
pub async fn get_car_info() -> CarInfo {
    let req = Client::builder().build().unwrap();
  let trace_id = Local::now().timestamp();
    let param = json!({
  "terminal": "devtools",
  "platform": "9",
  "channel": "miniprograms",
  "loginId": LOGIN_ID,
  "deviceId": DEVICE_ID,
  "v": "v5.3.4",
  "appVersion": "5.3.4",
  "vendorId": 67242,
  "source": "9",
  "cartConfig": {
    "closeUnMainFlag": 0,
    "resultGroupTypeFlag": 1,
    "searchOptTradeFlag": 1,
    "searchSimilayFlag": 0
  },
  "all": 1,
  "skeletonType": 1,
  "longitude": 113.494708,
  "latitude": 34.17114,
  "isMerge": true,
  "traceId": trace_id,
  "hideLoader": false,
  "simple": 0,
  "freeVersion": "1.9.2",
  "autoAddBuy": true,
  "commonAutoAddBuy": true,
  "storeGroupList": [
    "67242-668602",
    "67882-928002",
    "69522-928042"
  ]
}).to_string();
    let d_track_data = create_d_track_data();
    let mut form = HashMap::new();
    form.insert("param", param);
    form.insert("d_track_data", d_track_data);
    let headers = create_headers("trading.dmall-os.cn".to_string());
  let res = req.post("https://trading.dmall-os.cn/cartOnline/info")
      .headers(headers)
      .form(&form)
      .send()
      .await
      .unwrap()
      .json::<BaseResp<CarInfo>>()
      .await
      .unwrap();
  println!("res:{:#?}", res);
  res.data
}

#[cfg(test)]
mod tests {
  use crate::pdl_qianggou::get_car_info::get_car_info;

  #[tokio::test]
  async fn test_car_info() {
    get_car_info().await;
  }
}