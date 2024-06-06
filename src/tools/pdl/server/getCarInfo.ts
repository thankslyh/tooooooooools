import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import config from '../config.json';
import { createDTrackData, createHeaders } from '../util';

export interface CarInfo {
  checkedCountWithoutGift: number;
  discountPriceForUser: number;
  checkedSumWithoutGift: number;
}
export async function getCarInfo(): Promise<any> {
  const traceId = Date.now();
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
    cartConfig: {
      closeUnMainFlag: 0,
      resultGroupTypeFlag: 1,
      searchOptTradeFlag: 1,
      searchSimilayFlag: 0,
    },
    all: 1,
    skeletonType: 1,
    longitude: 113.494708,
    latitude: 34.17114,
    isMerge: true,
    traceId,
    hideLoader: false,
    simple: 0,
    freeVersion: '1.9.2',
    autoAddBuy: true,
    commonAutoAddBuy: true,
    storeGroupList: ['67242-668602', '67882-928002', '69522-928042'],
  });
  const dTrackData = createDTrackData();
  const data = qs.stringify({
    param,
    d_track_data: dTrackData,
  });
  const headers = createHeaders('trading.dmall-os.cn');
  const res = await Axios.post<AxiosResponse<BaseData<CarInfo>>>(
    'https://trading.dmall-os.cn/cartOnline/info',
    data,
    { headers },
  );
  return res.data;
}
