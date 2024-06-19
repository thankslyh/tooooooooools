import { Module } from '@nestjs/common';
import { XuanyuanService } from './xuanyuan.service';
import { XuanyuanController } from './xuanyuan.controller';
import { TasksService } from 'src/services/task.service';

@Module({
  controllers: [XuanyuanController],
  providers: [XuanyuanService, TasksService],
})
export class XuanyuanModule {}
