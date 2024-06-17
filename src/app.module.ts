import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './services/task.service';
import { PdlModule } from './pdl/pdl.module';
import { DdDamoclesModule } from './dd-damocles/dd-damocles.module';
import { DdDamocle } from './dd-damocles/entities/dd-damocle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Li!21577',
      database: 'damocles',
      synchronize: true,
      logging: true,
      entities: [DdDamocle],
      migrations: [],
      subscribers: [],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugins: 'sha256_password',
      },
    }),
    ScheduleModule.forRoot(),
    PdlModule,
    DdDamoclesModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
