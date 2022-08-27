import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field()
  discordId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
