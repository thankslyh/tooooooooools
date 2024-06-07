import Axios from 'axios';

export default async function sign() {
  const data = JSON.stringify({});
  return Axios.post(
    'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=7251940434845959732&spider=0',
    data,
    {
      headers: {
        Host: 'api.juejin.cn',
        Cookie:
          'csrf_session_id=d7222c01f3f556d9fbd1ef0918300c5e; _tea_utm_cache_2018={%22utm_source%22:%22gold_browser_extension%22}; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227377671192326637065%2522%252C%2522user_unique_id%2522%253A%25227377671192326637065%2522%252C%2522timestamp%2522%253A1717747947101%257D; passport_csrf_token=fea0a64541b5c13f9ef744f6b0b5365b; passport_csrf_token_default=fea0a64541b5c13f9ef744f6b0b5365b; n_mh=2VrOTksOlZexWfq6a-j6xvTeY1GqrwYTDlMjqD2IfR8; passport_auth_status=79ab6b6dd71886ae2f4a8148dfec4d48%2C; passport_auth_status_ss=79ab6b6dd71886ae2f4a8148dfec4d48%2C; sid_guard=3933065f95cab52a47d7ad8a1093c4f6%7C1717748015%7C31536000%7CSat%2C+07-Jun-2025+08%3A13%3A35+GMT; uid_tt=889cae3f21279f7a5c3ddcf279a4794f; uid_tt_ss=889cae3f21279f7a5c3ddcf279a4794f; sid_tt=3933065f95cab52a47d7ad8a1093c4f6; sessionid=3933065f95cab52a47d7ad8a1093c4f6; sessionid_ss=3933065f95cab52a47d7ad8a1093c4f6; sid_ucp_v1=1.0.0-KDE2OTVmN2E3YjE3OGM4Mjk2NTQzNWYxMTg5MWJkMjY5NmRiODdjYmMKFwi42-C__fX5BxCvgouzBhiwFDgCQPEHGgJsZiIgMzkzMzA2NWY5NWNhYjUyYTQ3ZDdhZDhhMTA5M2M0ZjY; ssid_ucp_v1=1.0.0-KDE2OTVmN2E3YjE3OGM4Mjk2NTQzNWYxMTg5MWJkMjY5NmRiODdjYmMKFwi42-C__fX5BxCvgouzBhiwFDgCQPEHGgJsZiIgMzkzMzA2NWY5NWNhYjUyYTQ3ZDdhZDhhMTA5M2M0ZjY; store-region=cn-bj; store-region-src=uid; msToken=-BLIqdJ-xsE6HDMRkjbtpdAbkkLjEc-5Gfeld-wahYpmUe37c504QyaxZ30iudWl2pyrOWF0ca8KXlPlWfa2S4JSbTLySTnKHefQknowERzrGrw_xRkaswKYSS7Y8A==',
        'sec-ch-ua':
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'content-type': 'application/json',
        'x-secsdk-csrf-token':
          '0001000000011c0a7f868c367d5ff604345036080918f2a71bd5218df40c5ebd2a8da6b7ee2b17d6ab13767651f8',
        'sec-ch-ua-mobile': '?0',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'sec-ch-ua-platform': '"macOS"',
        accept: '*/*',
        origin: 'https://juejin.cn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer: 'https://juejin.cn/',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,vi;q=0.7',
        priority: 'u=1, i',
      },
    },
  );
}
