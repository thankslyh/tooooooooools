use std::collections::HashMap;
use percent_encoding::{NON_ALPHANUMERIC, utf8_percent_encode};
use reqwest::Client;
use reqwest::multipart::Form;
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::pdl_qianggou::{BaseResp, create_d_track_data, create_headers, LOGIN_ID, SESSION_ID, STORE_ID, TICKET_NAME, TOKEN};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Address {
    pub id: i64,
    pub consignee: String,
    #[serde(rename = "mobilPhone")]
    pub mobil_phone: String,
    #[serde(rename = "amapId")]
    pub amap_id: String,
    #[serde(rename = "addressName")]
    pub address_name: String,
    #[serde(rename = "addressDetail")]
    pub address_detail: String,
    pub isdefault: i8,
    pub latitude: f64,
    pub longitude: f64,
    #[serde(rename = "addressLocated")]
    pub address_located: String,
}

pub async fn get_address() -> Address {
    let req = Client::builder().build().unwrap();
    let param = json!({
      "terminal": "devtools",
      "platform": "9",
      "channel": "miniprograms",
      "loginId": LOGIN_ID,
      "deviceId": "CAC07C7CCBD0000272296C3D430050601716360899813",
      "v": "v5.3.4",
      "appVersion": "5.3.4",
      "venderId": "67242",
      "vendorId": 67242,
      "source": "9",
      "fence": true,
      "storeId": STORE_ID,
      "fenceConfig": [
        {
          "businessType": "1",
          "deliveryType": "1",
          "erpStoreId": STORE_ID
        }
      ],
      "entryType": "o2o"
    }).to_string();
    let d_track_data = create_d_track_data();
    let mut form = HashMap::new();
    form.insert("param", param);
    form.insert("d_track_data", d_track_data);
    let headers = create_headers("trading.dmall-os.cn".to_string());
    let res = req.post("https://trading.dmall-os.cn/address/list")
        .headers(headers)
        .form(&form)
        .send()
        .await
        .unwrap()
        .json::<BaseResp<Vec<Address>>>()
        .await
        .unwrap();
    let f = res.data.iter().clone().find(|&a| a.isdefault == 2).unwrap();
    f.clone()
}

#[cfg(test)]
mod tests {
    use crate::pdl_qianggou::get_address::{ get_address };

    #[tokio::test]
    async fn test_address() {
        let addr = get_address().await;
        println!("{:#?}", addr);
        // test_address_exec().await;
    }
}