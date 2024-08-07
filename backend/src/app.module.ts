import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { WorldIdModule } from './world-id/world-id.module';

@Module({
  imports: [GptModule, WorldIdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
