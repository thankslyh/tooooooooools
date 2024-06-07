import { Test, TestingModule } from '@nestjs/testing';
import { PdlController } from './pdl.controller';
import { PdlService } from './pdl.service';

describe('PdlController', () => {
  let controller: PdlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdlController],
      providers: [PdlService],
    }).compile();

    controller = module.get<PdlController>(PdlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
