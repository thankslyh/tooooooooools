import Axios from 'axios';

export default async function sign(config: Record<string, any>) {
  const data = JSON.stringify({});
  return Axios.post<{ err_no: number; err_msg: string }>(
    'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=7251940434845959732&spider=0',
    data,
    {
      headers: config.headers,
    },
  );
}
