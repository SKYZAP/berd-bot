import { Field, ObjectType } from '@nestjs/graphql';
import { CardType, RarityType } from '../../../constants';
import { PerkDto } from '../../perk/dto/perk.dto';

@ObjectType()
export class CardDto {
  @Field()
  _id: string;

  @Field(() => CardType)
  type: CardType;

  @Field(() => RarityType)
  rarity: RarityType;

  @Field(() => [PerkDto], { nullable: true })
  perks?: PerkDto[];

  @Field()
  name: string;

  @Field()
  level: number;

  @Field()
  currentExp: number;

  @Field()
  totalExp: number;

  @Field()
  strength: number;

  @Field()
  dexterity: number;

  @Field()
  constitution: number;

  @Field()
  intelligence: number;

  @Field()
  wisdom: number;

  @Field()
  charisma: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
