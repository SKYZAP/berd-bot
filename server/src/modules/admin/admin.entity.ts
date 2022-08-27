import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../constants';
import * as bcrypt from 'bcryptjs';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  discordId: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  toDto() {
    const dto = {
      _id: this._id,
      password: this.password,
      discordId: this.discordId,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return dto;
  }
}
