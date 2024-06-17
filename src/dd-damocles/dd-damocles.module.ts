import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DdDamoclesService } from './dd-damocles.service';
import { DdDamoclesController } from './dd-damocles.controller';
import { DdDamocle } from './entities/dd-damocle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DdDamocle])],
  controllers: [DdDamoclesController],
  providers: [DdDamoclesService],
})
export class DdDamoclesModule {}
