use std::collections::HashMap;
use chrono::Local;
use reqwest::Client;
use serde_json::json;
use super::{LOGIN_ID, SESSION_ID, STORE_ID, create_headers, TICKET_NAME, TOKEN, create_d_track_data, DEVICE_ID};

pub async fn add_shop_car(sku: i64) -> anyhow::Result<String> {
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
  "all": 0,
  "skeletonType": 1,
  "longitude": 113.468764,
  "latitude": 34.152762,
  "isMerge": true,
  "traceId": trace_id,
  "hideLoader": true,
  "wareList": [
    {
      "storeId": STORE_ID,
      "wares": [
        {
          "sku": sku,
          "checked": 1,
          "count": 1
        }
      ]
    }
  ],
  "simple": 1,
  "cartConfig": {
    "resultGroupTypeFlag": 1,
    "searchOptTradeFlag": 1,
    "searchSimilayFlag": 0
  },
  "markCartFront": true,
  "freeVersion": "1.9.2"
}).to_string();
    let d_track_data = create_d_track_data();
    let mut form = HashMap::new();
    form.insert("param", param);
    form.insert("d_track_data", d_track_data);
    let client = Client::new();
    let headers = create_headers("trading.dmall-os.cn".to_string());
    let res = client.post("https://trading.dmall-os.cn/cartOnline/add")
        .headers(headers)
        .form(&form)
        .send()
        .await?
        .text()
        .await?;
    Ok(res)
}
