import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { WorldIdModule } from './world-id/world-id.module';
import { PropertyModule } from './property/property.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { PaymentsModule } from './payments/payments.module';
import { TenantsModule } from './tenants/tenants.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GptModule,
    WorldIdModule,
    PropertyModule,
    DatabaseModule,
    PaymentsModule,
    TenantsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
