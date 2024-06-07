import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import sign from 'src/tools/juejin/sign';
import { submitOrder } from 'src/tools/pdl/server';
import { readConfig } from 'src/tools/pdl/util';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // @Cron('0 30 09 * * *')
  // async handleCron() {
  //   const config = await readConfig();
  //   for (const i in config) {
  //     const cnf = config[i];
  //     if (cnf) {
  //       submitOrder(cnf).then(() => {
  //         this.logger.debug(`${i} 下单成功，请去支付`);
  //       });
  //     }
  //   }
  //   this.logger.debug('Called when the current second is 1');
  // }

  @Cron('0 27 09 * * *')
  async handleCron() {
    const res = await sign();
    this.logger.debug(JSON.stringify(res.data));
  }
}
