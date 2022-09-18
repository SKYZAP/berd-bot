import { Field, ObjectType } from '@nestjs/graphql';
import { PerkType, StatChangeDto } from '../../../constants';

@ObjectType()
export class PerkDto {
  @Field()
  _id: string;

  @Field(() => PerkType)
  type: PerkType;

  @Field(() => [StatChangeDto])
  statChange: StatChangeDto[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
