import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminDto {
  @Field(() => String)
  _id: string;

  @Field()
  discordId: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
