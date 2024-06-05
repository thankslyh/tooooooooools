use serde_json::json;
use super::{LOGIN_ID, SESSION_ID, STORE_ID, create_headers, TICKET_NAME, TOKEN, create_d_track_data, DEVICE_ID};

pub async fn search_goods(keyword: &str) {
    let param = json!({
  "terminal": "devtools",
  "platform": "9",
  "channel": "miniprograms",
  "loginId": LOGIN_ID,
  "deviceId": DEVICE_ID,
  "v": "v5.3.4",
  "appVersion": "5.3.4",
  "venderId": 67242,
  "vendorId": 67242,
  "source": "9",
  "src": 4,
  "pageSize": 20,
  "keyword": keyword,
  "queryType": 0,
  "sort": 0,
  "isOffline": false,
  "categoryLevel": 0,
  "fromType": 2,
  "sortRule": 0,
  "sortKey": 0,
  "noResultSearch": 0,
  "businessCode": 99,
  "pos": 1,
  "pageNum": 1,
  "from": 2,
  "categoryType": 0,
  "storeInfo": {
    "venderId": "67242",
    "defaultChosed": false,
    "storeId": STORE_ID,
    "name": "",
    "businessCode": "99"
  },
  "requestSource": "9",
  "requestVersion": "v5.3.4",
  "showPresale": false,
  "freeVersion": "1.9.2"
}).to_string();
  let trace_data = create_d_track_data();
}