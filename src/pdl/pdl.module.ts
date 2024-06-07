import { Module } from '@nestjs/common';
import { PdlService } from './pdl.service';
import { PdlController } from './pdl.controller';

@Module({
  controllers: [PdlController],
  providers: [PdlService],
})
export class PdlModule {}
