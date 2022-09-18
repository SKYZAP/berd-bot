import { Column, Entity } from 'typeorm';
import { BaseEntity, PerkType, StatChangeDto } from '../../constants';

@Entity('perks')
export class PerkEntity extends BaseEntity {
  @Column({ type: 'enum', enum: PerkType, default: PerkType.Positive })
  type: PerkType;

  @Column()
  statChange: StatChangeDto[];
}
