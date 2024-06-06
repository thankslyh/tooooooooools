import { Injectable } from '@nestjs/common';
import getAddress from './tools/pdl/server/getAddress';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAddress(): Promise<string> {
    await getAddress();
    return 'Hello address!';
  }
}
