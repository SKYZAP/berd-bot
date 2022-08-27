import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from '../card/card.repository';
import { CardService } from '../card/card.service';
import { PlayerRepository } from './player.repository';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository, CardRepository])],
  providers: [PlayerService, PlayerResolver, CardService],
  exports: [PlayerService],
})
export class PlayerModule {}
