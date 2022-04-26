import { Test, TestingModule } from '@nestjs/testing';
import { HerdService } from './herd.service';

describe('HerdService', () => {
  let service: HerdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HerdService],
    }).compile();

    service = module.get<HerdService>(HerdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
