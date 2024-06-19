import { Test, TestingModule } from '@nestjs/testing';
import { XuanyuanController } from './xuanyuan.controller';
import { XuanyuanService } from './xuanyuan.service';

describe('XuanyuanController', () => {
  let controller: XuanyuanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XuanyuanController],
      providers: [XuanyuanService],
    }).compile();

    controller = module.get<XuanyuanController>(XuanyuanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
