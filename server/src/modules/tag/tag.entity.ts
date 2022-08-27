import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../constants';

@Entity('tags')
export class TagEntity extends BaseEntity {
  @Column()
  name: string;
}
