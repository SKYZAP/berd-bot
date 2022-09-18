import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsString } from 'class-validator';
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

export class UploadDto {
  @IsString()
  title: string;

  @IsString()
  name: string;
}

@ObjectType()
export class MediaDto {
  @Field()
  @IsString()
  url: string;

  @Field()
  @IsString()
  public_id: string;
}

@InputType()
export class MediaInputDto {
  @Field()
  url: string;

  @Field()
  public_id: string;
}

@InputType()
export class PaginationOptions {
  @Field({ nullable: true })
  page?: number = 1;

  @Field({ nullable: true })
  records?: number = 5;
}

@InputType('StatChangeInputDto')
@ObjectType()
export class StatChangeDto {
  @Field()
  statName: string;

  @Field()
  value: number;
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
