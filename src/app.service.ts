import { Injectable } from '@nestjs/common';
import { readConfig } from './tools/pdl/util';
import { fangtangPusher } from './tools/pusher';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAddress(): Promise<string> {
    await readConfig();
    return 'Hello address!';
  }

  async getPusher() {
    fangtangPusher('掘金签到：成功', '今天已签到成功');
    return 'successs';
  }
}
