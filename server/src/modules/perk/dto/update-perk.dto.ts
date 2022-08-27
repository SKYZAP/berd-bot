import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePerkDto } from './create-perk.dto';

@InputType()
export class UpdatePerkDto extends PartialType(CreatePerkDto) {}
