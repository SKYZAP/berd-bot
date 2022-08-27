import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  discordId: string;
}
