import { Field, InputType } from '@nestjs/graphql';
import { PerkType } from '../../../constants';
import { StatChangeDto } from '../../../utils';

@InputType()
export class CreatePerkDto {
  @Field(() => PerkType)
  type: PerkType;

  @Field(() => [StatChangeDto])
  statChange: StatChangeDto[];
}
