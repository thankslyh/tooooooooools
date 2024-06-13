import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import sign from 'src/tools/juejin/sign';
// import { submitOrder } from 'src/tools/pdl/server';
// import { readConfig } from 'src/tools/pdl/util';
import { fangtangPusher } from 'src/tools/pusher';

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
    this.logger.debug('执行定时任务...........');
    const res = await sign();
    fangtangPusher(
      `掘金签到：${+res.data.err_no === 0 ? '成功' : '失败'}`,
      res.data.err_msg,
    );
    this.logger.debug(JSON.stringify(res.data));
  }
}
