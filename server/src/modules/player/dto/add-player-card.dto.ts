import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class AddPlayerCardDto {
  @IsString()
  @Field()
  playerId: string;

  @IsNumber()
  @Field()
  cardId: number;
}
