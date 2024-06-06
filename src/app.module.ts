import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './services/task.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
