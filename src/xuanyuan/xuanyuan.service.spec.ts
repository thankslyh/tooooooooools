import { Test, TestingModule } from '@nestjs/testing';
import { XuanyuanService } from './xuanyuan.service';

describe('XuanyuanService', () => {
  let service: XuanyuanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XuanyuanService],
    }).compile();

    service = module.get<XuanyuanService>(XuanyuanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
