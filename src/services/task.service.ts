import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import draw from 'src/tools/juejin/draw';
import receive from 'src/tools/juejin/receive';
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

  @Cron('30 08 * * *')
  async handleCron() {
    this.logger.debug('执行定时任务...........');
    try {
      const pwd = process.cwd();
      const path = `${pwd}/app-config/juejin.config.json`;
      const config = (await import(path)) as Record<string, any>;
      let text = '';
      const res = await sign(config);
      text += `签到结果：${res.data.err_msg}\n\n`;
      const drawRes = await draw(config);
      text += `抽奖结果： ${JSON.stringify(drawRes.data)}\n\n`;
      const receiveRes = await receive(config);
      text += `领取结果： ${JSON.stringify(receiveRes.data)}\n\n`;
      fangtangPusher(
        `掘金签到：${+res.data.err_no === 0 ? '成功' : '失败'}`,
        text,
      );
      this.logger.debug('执行成功');
    } catch (e) {
      fangtangPusher(`掘金签到：错误`, JSON.stringify(e));
      this.logger.error(e);
    }
  }

  async testTask() {
    this.logger.debug('执行定时任务...........');
    return '测试执行定时任务';
  }
}
