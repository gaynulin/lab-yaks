import { Test, TestingModule } from '@nestjs/testing';
import { HerdController } from './herd.controller';

describe('HerdController', () => {
  let controller: HerdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HerdController],
    }).compile();

    controller = module.get<HerdController>(HerdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
