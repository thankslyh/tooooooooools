use std::collections::HashMap;
use chrono::Local;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use crate::pdl_qianggou::{BaseResp, create_d_track_data, create_headers, TOKEN, LOGIN_ID, DEVICE_ID, USER_ID, STORE_ID};
use crate::pdl_qianggou::get_address::Address;
use crate::pdl_qianggou::get_car_info::CarInfo;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Module {
  #[serde(rename = "moduleName")]
  pub module_name: String,
  pub data: Value,
}
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct MiniInfo {
    #[serde(rename = "moduleList")]
    module_list: Vec<Module>,
}
pub async fn get_mini_info(addr: Address, car_info: CarInfo) -> String {
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
  "venderId": "67242",
  "vendorId": 67242,
  "source": 9,
  "storeId": STORE_ID,
  "businessType": "1",
  "tradeConfId": "miniprogramo2o",
  "onlyPick": "false",
  "settlementPenetrateStoreVOStr": {
    "checkedSumWithoutGift": car_info.checked_sum_without_gift,
    "orderSaleType": 1,
    "preSaleTagGroup": 0,
    "totalOriginPrice": car_info.discount_price_for_user
  },
  "consignStr": {
    "id": addr.id,
    "webuserId": USER_ID,
    "consignee": addr.consignee,
    "mobilPhone": addr.mobil_phone,
    "telePhone": null,
    "email": null,
    "areaId1": 410000,
    "areaName1": "河南省",
    "areaId2": 374,
    "areaName2": "许昌市",
    "areaId3": 411081,
    "areaName3": "禹州市",
    "addressId": null,
    "amapId": addr.amap_id,
    "addressName": addr.address_name,
    "addressDetail": "",
    "addressAlias": "家",
    "isdefault": 2,
    "properties": null,
    "latitude": addr.latitude,
    "longitude": addr.longitude,
    "tempConsign": false,
    "modified": "1716193620000",
    "yn": 1,
    "idCard": null,
    "version": "1",
    "needUpdate": null,
    "platform": null,
    "queryType": 1,
    "exceptionConsign": null,
    "addressLocated": addr.address_located,
    "created": "1716193620000",
    "remark": null,
    "inFence": true,
    "hitStoreIds": null,
    "distance": null,
    "hasList": true,
    "hasAddrLists": true
  },
  "token": TOKEN,
  "equipmentNo": DEVICE_ID,
  "pubParam": {
    "dSource": ""
  },
  "useAppAddressStyle": true
}).to_string();
    let d_track_data = create_d_track_data();
    let mut form = HashMap::new();
    form.insert("param", param);
    form.insert("d_track_data", d_track_data);
    let headers = create_headers("trade.dmall-os.cn".to_string());
    let res = req.post("https://trade.dmall-os.cn/trade/gate/mini/info")
        .headers(headers)
        .form(&form)
        .send()
        .await
        .unwrap()
        .json::<BaseResp<MiniInfo>>()
        .await
        .unwrap();
  let ship = res.data.module_list.iter().find(|&m| m.module_name.eq("shipment")).unwrap().data.clone();
  let ship_time = ship.as_object().unwrap().get("shipTime").unwrap();
  let current_ship_time_item = ship_time.as_object().unwrap().get("currentShipTimeItem").unwrap().as_array().unwrap();
  let target = current_ship_time_item.first().unwrap().as_object().unwrap().get("timeList_").unwrap().as_array().unwrap().first();
  let display_value = target.unwrap().as_object().unwrap().get("displayValue").unwrap().as_str().unwrap().to_string();
  display_value
}

#[cfg(test)]
mod test {
  use crate::pdl_qianggou::get_address::{Address, get_address};
  use crate::pdl_qianggou::get_car_info::get_car_info;
  use crate::pdl_qianggou::get_mini_info::get_mini_info;

  #[tokio::test]
  async fn test_min_info() {
    let addr = get_address().await;
    let car_info = get_car_info().await;
    get_mini_info(addr, car_info).await;
  }
}