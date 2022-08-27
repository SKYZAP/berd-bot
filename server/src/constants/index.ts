import { Field, registerEnumType } from '@nestjs/graphql';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  @Field(() => String)
  _id: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

export enum RarityType {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Epic = 'Epic',
  Artisan = 'Artisan',
  Legendary = 'Legendary',
}
registerEnumType(RarityType, { name: 'RarityType' });

export enum CardType {
  Friendly = 'Friendly',
  Enemy = 'Enemy',
}
registerEnumType(CardType, { name: 'CardType' });

export enum PerkType {
  Positive = 'Positive',
  Negative = 'Negative',
}
registerEnumType(PerkType, { name: 'PerkType' });
