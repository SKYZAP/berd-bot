import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../constants';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  discordId: string;
}
