import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCardDto } from './create-card.dto';

@InputType()
export class UpdateCardDto extends PartialType(CreateCardDto) {}
