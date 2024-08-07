import { Test, TestingModule } from '@nestjs/testing';
import { WorldIdController } from './world-id.controller';
import { WorldIdService } from './world-id.service';

describe('WorldIdController', () => {
  let controller: WorldIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldIdController],
      providers: [WorldIdService],
    }).compile();

    controller = module.get<WorldIdController>(WorldIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
