import { Test, TestingModule } from '@nestjs/testing';
import { DdDamoclesService } from './dd-damocles.service';

describe('DdDamoclesService', () => {
  let service: DdDamoclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DdDamoclesService],
    }).compile();

    service = module.get<DdDamoclesService>(DdDamoclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
