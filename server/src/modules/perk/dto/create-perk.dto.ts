import { Field, InputType } from '@nestjs/graphql';
import { PerkType, StatChangeDto } from '../../../constants';

@InputType()
export class CreatePerkDto {
  @Field(() => PerkType)
  type: PerkType;

  @Field(() => [StatChangeDto])
  statChange: StatChangeDto[];
}
