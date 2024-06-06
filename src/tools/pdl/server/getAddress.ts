import qs from 'qs';
import Axios, { AxiosResponse } from 'axios';
import config from '../config.json';
import { createDTrackData, createHeaders } from '../util';

export interface Address {
  id: number;
  consignee: string;
  mobilPhone: string;
  amapId: string;
  addressName: string;
  addressDetail: string;
  isdefault: number;
  latitude: number;
  longitude: number;
  addressLocated: string;
}

export default function getAddress(): Promise<Address> {
  const param = JSON.stringify({
    terminal: 'devtools',
    platform: '9',
    channel: 'miniprograms',
    loginId: config.loginId,
    deviceId: config.deviceId,
    v: 'v5.3.4',
    appVersion: '5.3.4',
    venderId: '67242',
    vendorId: 67242,
    source: '9',
    fence: true,
    storeId: config.storeId,
    fenceConfig: [
      {
        businessType: '1',
        deliveryType: '1',
        erpStoreId: config.storeId,
      },
    ],
    entryType: 'o2o',
  });
  const dTrackData = createDTrackData();
  const data = qs.stringify({
    param,
    d_track_data: dTrackData,
  });
  const headers = createHeaders('trading.dmall-os.cn');
  return Axios.post<any, AxiosResponse<BaseData<Array<Address>>>>(
    'https://trading.dmall-os.cn/address/list',
    data,
    {
      headers,
    },
  ).then((res) => {
    return res.data.data[0];
  });
}
