import { Injectable } from '@nestjs/common';
import { readConfig } from './tools/pdl/util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAddress(): Promise<string> {
    await readConfig();
    return 'Hello address!';
  }
}
