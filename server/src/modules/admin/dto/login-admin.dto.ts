import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginAdminDto {
  @Field()
  @IsString()
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
