import { Body, Get, Controller, Post } from '@nestjs/common';
import { XuanyuanService } from './xuanyuan.service';

@Controller('xuanyuan')
export class XuanyuanController {
  constructor(private readonly xuanyuanService: XuanyuanService) {}

  @Post('/juejin/update-config')
  async updateJuejinConfig(@Body() body: any) {
    return await this.xuanyuanService.updateJuejinConfig(body.config);
  }

  @Get('/juejin/do-task')
  async doJuejinTask() {
    return await this.xuanyuanService.doJuejinTask();
  }
}
