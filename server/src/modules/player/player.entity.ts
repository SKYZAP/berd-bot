import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../constants';
import { CardDto } from '../card/dto/card.dto';

@Entity('players')
export class PlayerEntity extends BaseEntity {
  @Column()
  username: string;

  @Column('integer')
  score: number;

  @Column('integer')
  battlesWon: number;

  @Column()
  cards?: CardDto[];
}
