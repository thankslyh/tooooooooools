import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './services/task.service';
import { PdlModule } from './pdl/pdl.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), PdlModule],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
