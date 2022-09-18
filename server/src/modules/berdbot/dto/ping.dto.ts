import { Param } from '@discord-nestjs/core';
import { Transform } from 'class-transformer';

export class PingDto {
  @Transform(({ value }) => value.toUpperCase())
  @Param({
    name: 'text',
    description: 'Some text you want to display',
    required: true,
  })
  text: string;
}
