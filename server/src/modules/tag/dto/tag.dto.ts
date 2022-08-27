import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagDto {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
