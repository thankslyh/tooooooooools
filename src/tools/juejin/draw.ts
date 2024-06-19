import Axios from 'axios';

export default async function draw(config: Record<string, any>) {
  const data = JSON.stringify({});
  return Axios.post<{ err_no: number; err_msg: string }>(
    'https://api.juejin.cn/growth_api/v1/lottery/draw?aid=2608&uuid=7251940434845959732&spider=0',
    data,
    {
      headers: config.headers,
    },
  );
}
