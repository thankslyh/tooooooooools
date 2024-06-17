import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './services/task.service';
import { PdlModule } from './pdl/pdl.module';
import { DdDamoclesModule } from './dd-damocles/dd-damocles.module';
import { DdDamocle } from './dd-damocles/entities/dd-damocle.entity';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory(cnf: ConfigService) {
        return {
          type: 'mysql',
          host: cnf.get('DB_HOST'),
          port: cnf.get('DB_PORT'),
          username: cnf.get('DB_USER'),
          password: cnf.get('DB_PASSWORD'),
          database: cnf.get('DB_NAME'),
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
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (cnf: ConfigService) => ({
        secret: cnf.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    PdlModule,
    DdDamoclesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TasksService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
