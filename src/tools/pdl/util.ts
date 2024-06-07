export function createDTrackData(cnf: PdlConfig) {
  const data = {
    session_id: cnf.sessionId,
    project: 'pangdonglai_mini',
    tdc: '',
    tpc: '',
    uuid: cnf.deviceId,
    env: 'minip',
  };
  return JSON.stringify(data);
}

export function createHeaders(cnf: PdlConfig, host: string) {
  return {
    Host: host,
    clientType: 1,
    grayVenderId: 67242,
    mixFlag: 1,
    v: 'v5.3.4',
    originBusinessFormat: 1,
    scene: 'o2o',
    userId: cnf.userId,
    networkType: 0,
    grayStoreId: cnf.storeId,
    appletType: 62,
    channel: 'miniprograms',
    uniqueCode: 'pdl_wx',
    latitude: '40.01219562070234',
    deliveryLat: '34.17114',
    areaId: 374,
    areaCode: 411081,
    longitude: '40.01219562070234',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) XWEB/1191',
    'Content-Type': 'application/x-www-form-urlencoded',
    ticketName: cnf.ticketName,
    dmTenantId: 42,
    venderId: 67242,
    businessCode: 1,
    deliveryLng: '113.494708',
    storeGroupKey: cnf.storeGroupKey,
    xweb_xhr: 1,
    platform: 9,
    token: cnf.token,
    storeId: cnf.storeId,
    appVersion: '5.3.4',
    Referer: 'https://servicewechat.com/wx9572d0552dfc7579/43/page-frame.html',
  };
}

export async function readConfig() {
  const pwd = process.cwd();
  const path = `${pwd}/pdl.config.json`;
  const res = await import(path);
  return res as Record<string, PdlConfig>;
}
