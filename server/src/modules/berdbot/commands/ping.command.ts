import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PingDto } from '../dto/ping.dto';

const commandEnv =
  new ConfigService().get('NODE_ENV') == 'production' ? '' : '[Dev] - ';

@Command({
  name: 'ping',
  description: commandEnv + 'Replies with text!',
})
@UsePipes(TransformPipe)
export class PingCommand implements DiscordTransformedCommand<PingDto> {
  handler(
    @Payload() dto: PingDto,
    { interaction }: TransformedCommandExecutionContext,
  ) {
    interaction.reply(`Text: ${dto.text}.`);
  }
}
