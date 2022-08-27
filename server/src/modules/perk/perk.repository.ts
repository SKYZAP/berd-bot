import { EntityRepository, Repository } from 'typeorm';
import { PerkEntity } from './perk.entity';

@EntityRepository(PerkEntity)
export class PerkRepository extends Repository<PerkEntity> {}
