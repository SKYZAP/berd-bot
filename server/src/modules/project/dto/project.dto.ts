import { Field, ObjectType } from '@nestjs/graphql';
import { TagDto } from '../../tag/dto/tag.dto';

@ObjectType()
export class ProjectDto {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [TagDto])
  tags: TagDto[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
