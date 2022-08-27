import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardRepository])],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
