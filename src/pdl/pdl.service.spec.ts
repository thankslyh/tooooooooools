import { Test, TestingModule } from '@nestjs/testing';
import { PdlService } from './pdl.service';

describe('PdlService', () => {
  let service: PdlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdlService],
    }).compile();

    service = module.get<PdlService>(PdlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
