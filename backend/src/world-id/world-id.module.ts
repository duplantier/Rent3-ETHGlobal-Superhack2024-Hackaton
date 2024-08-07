import { Module } from '@nestjs/common';
import { WorldIdService } from './world-id.service';
import { WorldIdController } from './world-id.controller';

@Module({
  controllers: [WorldIdController],
  providers: [WorldIdService],
})
export class WorldIdModule {}
