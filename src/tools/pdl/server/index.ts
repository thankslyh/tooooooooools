import getAddress from './getAddress';
import { getCarInfo } from './getCarInfo';
import { submit } from './submit';

export async function submitOrder(cnf: PdlConfig) {
  try {
    const addr = await getAddress(cnf);
    const carInfo = await getCarInfo(cnf);
    await submit(cnf, addr, carInfo);
  } catch (e) {
    throw e;
  }
}
