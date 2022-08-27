import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateAdminDto {
  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  discordId: string;

  @Field()
  @IsString()
  email: string;
}
