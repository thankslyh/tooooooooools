interface BaseData<T> {
  code: number;
  data: T;
  msg: string;
}

interface PdlConfig {
  loginId: string;
  storeId: number;
  sessionId: string;
  storeGroupKey: string;
  deviceId: string;
  userId: number;
  ticketName: string;
  token: string;
}
