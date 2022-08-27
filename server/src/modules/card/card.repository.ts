import { EntityRepository, Repository } from 'typeorm';
import { CardEntity } from './card.entity';

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {}
