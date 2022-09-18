import { Param, ParamType } from '@discord-nestjs/core';
import { Transform } from 'class-transformer';

export class SlapDto {
  @Transform(({ value }) => value.toUpperCase())
  @Param({
    type: ParamType.USER,
    name: 'target',
    description: 'Select a slap target',
    required: true,
  })
  target: string;
}
