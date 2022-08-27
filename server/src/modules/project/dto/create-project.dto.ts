import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateProjectDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsArray()
  @Field(() => [String])
  tags: string[];
}
