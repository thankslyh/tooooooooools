import { Test, TestingModule } from '@nestjs/testing';
import { DdDamoclesController } from './dd-damocles.controller';
import { DdDamoclesService } from './dd-damocles.service';

describe('DdDamoclesController', () => {
  let controller: DdDamoclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DdDamoclesController],
      providers: [DdDamoclesService],
    }).compile();

    controller = module.get<DdDamoclesController>(DdDamoclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
