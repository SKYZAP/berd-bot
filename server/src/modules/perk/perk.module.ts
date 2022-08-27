import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerkRepository } from './perk.repository';
import { PerkResolver } from './perk.resolver';
import { PerkService } from './perk.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerkRepository])],
  providers: [PerkService, PerkResolver],
  exports: [PerkService],
})
export class PerkModule {}
