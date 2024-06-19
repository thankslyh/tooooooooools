import Axios from 'axios';

export default async function receive(config: Record<string, any>) {
  return Axios.get<{ err_no: number; err_msg: string }>(
    'https://api.juejin.cn/growth_api/v1/get_cur_point?aid=2608&uuid=7377671192326637065&spider=0',
    {
      headers: config.headers,
    },
  );
}
