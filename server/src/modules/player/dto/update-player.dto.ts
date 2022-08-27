import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePlayerDto } from './create-player.dto';

@InputType()
export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
