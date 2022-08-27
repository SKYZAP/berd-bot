import { Field, InputType } from '@nestjs/graphql';
import { CardType } from '../../../constants';

@InputType()
export class CreateCardDto {
  @Field(() => CardType)
  type: CardType;

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
}
