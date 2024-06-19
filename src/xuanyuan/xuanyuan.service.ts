import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { TasksService } from 'src/services/task.service';

@Injectable()
export class XuanyuanService {
  constructor() {}

  @Inject()
  private readonly taskService: TasksService;
  updateJuejinConfig(config: string) {
    const cwd = process.cwd();
    // console.log(decodeURIComponent(config))
    const path = `${cwd}/app-config/juejin.config.json`;
    fs.writeFileSync(path, decodeURIComponent(config), 'utf-8');
    return 'success';
  }

  doJuejinTask() {
    return this.taskService.handleCron();
  }
}
