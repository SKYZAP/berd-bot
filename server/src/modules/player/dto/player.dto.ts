import { Field, ObjectType } from '@nestjs/graphql';
import { CardDto } from '../../card/dto/card.dto';

@ObjectType()
export class PlayerDto {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field()
  score: number;

  @Field()
  battlesWon: number;

  @Field(() => [CardDto], { nullable: true })
  cards?: CardDto[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
