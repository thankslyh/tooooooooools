import * as qs from 'qs';
import Axios, { AxiosResponse } from 'axios';
import config from '../config';
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

export default async function getAddress(cnf: PdlConfig): Promise<Address> {
  try {
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
    const dTrackData = createDTrackData(cnf);
    const data = qs.stringify({
      param,
      d_track_data: dTrackData,
    });
    const headers = createHeaders(cnf, 'trading.dmall-os.cn');
    const res = await Axios.post<any, AxiosResponse<BaseData<Array<Address>>>>(
      'https://trading.dmall-os.cn/address/list',
      data,
      {
        headers,
      },
    );
    return res.data.data[0];
  } catch (err) {
    console.log(err);
  }
}
