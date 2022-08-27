import { Field, ObjectType } from '@nestjs/graphql';
import { PerkType } from '../../../constants';
import { StatChangeDto } from '../../../utils';

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
