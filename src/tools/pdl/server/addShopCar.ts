import Axios from 'axios';
import * as qs from 'qs';
import config from '../config';
import { createDTrackData, createHeaders } from '../util';

export default function addShopCar(cnf: PdlConfig, sku: number): Promise<any> {
  const trace_id = Date.now();
  const param = JSON.stringify({
    terminal: 'devtools',
    platform: '9',
    channel: 'miniprograms',
    loginId: config.loginId,
    deviceId: config.deviceId,
    v: 'v5.3.4',
    appVersion: '5.3.4',
    vendorId: 67242,
    source: '9',
    all: 0,
    skeletonType: 1,
    longitude: 113.468764,
    latitude: 34.152762,
    isMerge: true,
    traceId: trace_id,
    hideLoader: true,
    wareList: [
      {
        storeId: config.storeId,
        wares: [
          {
            sku,
            checked: 1,
            count: 1,
          },
        ],
      },
    ],
    simple: 1,
    cartConfig: {
      resultGroupTypeFlag: 1,
      searchOptTradeFlag: 1,
      searchSimilayFlag: 0,
    },
    markCartFront: true,
    freeVersion: '1.9.2',
  });
  const dTrackData = createDTrackData(cnf);
  const data = qs.stringify({
    param,
    d_track_data: dTrackData,
  });
  const headers = createHeaders(cnf, 'trading.dmall-os.cn');
  return Axios.post('https://trading.dmall-os.cn/cartOnline/add', data, {
    headers,
  });
}
