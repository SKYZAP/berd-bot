import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { CardDto } from '../../card/dto/card.dto';

@InputType()
export class CreatePlayerDto {
  @IsString()
  @Field()
  username: string;

  @IsNumber()
  @Field()
  score: number;

  @IsNumber()
  @Field()
  battlesWon: number;
}
