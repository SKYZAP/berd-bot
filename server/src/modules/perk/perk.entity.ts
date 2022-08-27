import { Column, Entity } from 'typeorm';
import { BaseEntity, PerkType } from '../../constants';
import { StatChangeDto } from '../../utils';

@Entity('perks')
export class PerkEntity extends BaseEntity {
  @Column({ type: 'enum', enum: PerkType, default: PerkType.Positive })
  type: PerkType;

  @Column()
  statChange: StatChangeDto[];
}
