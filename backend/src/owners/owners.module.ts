import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
