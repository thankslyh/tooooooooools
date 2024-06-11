import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/address')
  async getAddress(): Promise<string> {
    return this.appService.getAddress();
  }

  @Get('/pusher')
  async getPusher(): Promise<string> {
    return this.appService.getPusher();
  }
}
