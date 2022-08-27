import { Column, Entity } from 'typeorm';
import { BaseEntity, CardType, RarityType } from '../../constants';
import { PerkDto } from '../perk/dto/perk.dto';

@Entity('cards')
export class CardEntity extends BaseEntity {
  @Column({ type: 'enum', enum: CardType, default: CardType.Enemy })
  type: CardType;

  @Column({ type: 'enum', enum: RarityType, default: RarityType.Common })
  rarity: RarityType;

  @Column()
  perks?: PerkDto[];

  @Column()
  name: string;

  @Column('integer')
  level: number;

  @Column('integer')
  currentExp: number;

  @Column('integer')
  totalExp: number;

  @Column('integer')
  strength: number;

  @Column('integer')
  dexterity: number;

  @Column('integer')
  constitution: number;

  @Column('integer')
  intelligence: number;

  @Column('integer')
  wisdom: number;

  @Column('integer')
  charisma: number;
}
