import Axios from 'axios';
import * as qs from 'qs';

export default async function pusher(text: string, desp: string = '') {
  const key = process.env.FT_API_KEY;
  const data = qs.stringify({
    text,
    desp,
  });
  return Axios.post(`https://sctapi.ftqq.com/${key}.send`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
