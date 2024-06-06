import Axios from 'axios';
import * as qs from 'qs';
import config from '../config';
import { createDTrackData, createHeaders } from '../util';
import { Address } from './getAddress';
import { CarInfo } from './getCarInfo';
import { getMiniInfo, ShipTime } from './getMiniInfo';

export async function submit(addr: Address, carInfo: CarInfo): Promise<any> {
  try {
    const shipTime = await getMiniInfo(addr, carInfo);
    const param = createSubmitParam(addr, carInfo, shipTime);
    const dTrackData = createDTrackData();
    const headers = createHeaders('trade.dmall-os.cn');
    const data = qs.stringify({
      param,
      d_track_data: dTrackData,
    });
    const res = await Axios.post(
      `https://trade.dmall-os.cn/trade/gate/mini/submit`,
      data,
      {
        headers,
      },
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export function createSubmitParam(
  addr: Address,
  carInfo: CarInfo,
  shipTime: ShipTime,
): string {
  return JSON.stringify({
    terminal: 'devtools',
    platform: '9',
    channel: 'miniprograms',
    loginId: config.loginId,
    deviceId: 'CABFDC89FA600002A2243113F9D09DF01716193181646',
    v: 'v5.3.4',
    appVersion: '5.3.4',
    venderId: 67242,
    vendorId: 67242,
    source: 9,
    addressContentStr: {
      addressId: addr.id,
      areaId: 411081,
      name: addr.consignee,
      phone: addr.mobilPhone,
      addressPrefix: addr.addressName,
      addressDetail: addr.addressDetail,
      latitude: addr.latitude,
      longitude: addr.longitude,
      amapId: addr.amapId,
      addressLocated: addr.addressLocated,
    },
    shipmentContentStr: {
      shipmentType: 1,
      shipmentDate: shipTime.date,
      shipmentTime: shipTime.displayValue,
      shipmentOption: 6000,
    },
    remark: null,
    afterPromotionPrice: carInfo.discountPriceForUser,
    wareTotalNum: carInfo.checkedCountWithoutGift,
    couponCodeList: [],
    invoiceContentStr: {
      addressAndPhone: '',
      bank: '',
      bankAccount: '',
      contactNumber: '',
      recipient: '',
      invoiceFlag: 0,
      invoiceTitle: '',
      invoiceContentType: 1,
      invoiceContent: '',
      invoiceType: null,
      invoiceContentCode: null,
      invoiceAddress: '',
      taxNum: '',
    },
    isUseCovert: 1,
    tipCode: '',
    needPopPwd: false,
    storeId: config.storeId,
    tradeConfId: 'miniprogramo2o',
    settlementPenetrateStoreVOStr: {
      checked_sum_without_gift: carInfo.checkedSumWithoutGift,
      orderSaleType: 1,
      preSaleTagGroup: 0,
      totalOriginPrice: carInfo.discountPriceForUser,
    },
    onlyPick: 'false',
    token: config.token,
    equipmentNo: config.deviceId,
    pubParam: {
      dSource: '',
    },
    useAppAddressStyle: true,
  });
}
