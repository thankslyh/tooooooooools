import Axios, { AxiosResponse } from 'axios';
import * as qs from 'qs';
import config from '../config';
import { createDTrackData, createHeaders } from '../util';
import { CarInfo } from './getCarInfo';
import { Address } from './getAddress';

export interface Module {
  moduleName: string;
  data: any;
}

export interface MiniInfo {
  moduleList: Array<Module>;
}

export interface ShipTime {
  date: string;
  displayValue: string;
}
export async function getMiniInfo(
  addr: Address,
  carInfo: CarInfo,
): Promise<ShipTime> {
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
      source: 9,
      storeId: config.storeId,
      businessType: '1',
      tradeConfId: 'miniprogramo2o',
      onlyPick: 'false',
      settlementPenetrateStoreVOStr: {
        checkedSumWithoutGift: carInfo.checkedSumWithoutGift,
        orderSaleType: 1,
        preSaleTagGroup: 0,
        totalOriginPrice: carInfo.discountPriceForUser,
      },
      consignStr: {
        id: addr.id,
        webuserId: config.userId,
        consignee: addr.consignee,
        mobilPhone: addr.mobilPhone,
        telePhone: null,
        email: null,
        areaId1: 410000,
        areaName1: '河南省',
        areaId2: 374,
        areaName2: '许昌市',
        areaId3: 411081,
        areaName3: '禹州市',
        addressId: null,
        amapId: addr.amapId,
        addressName: addr.addressName,
        addressDetail: '',
        addressAlias: '家',
        isdefault: 2,
        properties: null,
        latitude: addr.latitude,
        longitude: addr.longitude,
        tempConsign: false,
        modified: '1716193620000',
        yn: 1,
        idCard: null,
        version: '1',
        needUpdate: null,
        platform: null,
        queryType: 1,
        exceptionConsign: null,
        addressLocated: addr.addressLocated,
        created: '1716193620000',
        remark: null,
        inFence: true,
        hitStoreIds: null,
        distance: null,
        hasList: true,
        hasAddrLists: true,
      },
      token: config.token,
      equipmentNo: config.deviceId,
      pubParam: {
        dSource: '',
      },
      useAppAddressStyle: true,
    });
    const dTrackData = createDTrackData();
    const data = qs.stringify({
      param,
      d_track_data: dTrackData,
    });
    const headers = createHeaders('trade.dmall-os.cn');
    const res = await Axios.post<AxiosResponse<BaseData<MiniInfo>>>(
      'https://trade.dmall-os.cn/trade/gate/mini/info',
      data,
      { headers },
    );
    const moduleList = res.data.data.data.moduleList;
    const shipment = moduleList.find(
      (module) => module.moduleName === 'shipment',
    );
    const currentShipTimeFirst =
      shipment.data?.shipTime?.currentShipTimeItem?.[0];
    const date = currentShipTimeFirst?.date;
    const displayValue = currentShipTimeFirst?.timeList_?.[0].displayValue;
    return { date, displayValue };
  } catch (e) {
    console.log(e);
  }
}
