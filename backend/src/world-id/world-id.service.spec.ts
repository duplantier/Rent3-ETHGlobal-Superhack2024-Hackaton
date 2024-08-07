import { Test, TestingModule } from '@nestjs/testing';
import { WorldIdService } from './world-id.service';

describe('WorldIdService', () => {
  let service: WorldIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldIdService],
    }).compile();

    service = module.get<WorldIdService>(WorldIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
