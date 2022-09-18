import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { SlapDto } from '../dto/slap.dto';

@Command({
  name: 'slap',
  description: 'Slap your friends virtually',
})
@UsePipes(TransformPipe)
export class SlapCommand implements DiscordTransformedCommand<SlapDto> {
  async handler(
    @Payload() dto: SlapDto,
    { interaction }: TransformedCommandExecutionContext,
  ) {
    const random = Math.floor(Math.random() * 100);
    const user = interaction.client.users.cache.get(dto.target);
    let message = '';
    await interaction.deferReply();

    if (!user)
      await interaction.followUp({
        content: '***User not found***',
        ephemeral: true,
      });

    if (user.id === interaction.user.id) {
      await interaction.followUp("***You can't slap yourself***");
    } else if (user.id === process.env.DISCORD_CLIENTID) {
      await interaction.followUp(
        '***Berd-Bot gives you a disappointed stare***',
      );
    } else {
      if (random >= 0 && random < 80) {
        message = `***${user} was slapped :clap:***`;
      } else if (random >= 80 && random <= 99) {
        message = '***You were confused and slapped yourself***';
      } else {
        message = '***:clap: Berd-Bot has slapped you himself :clap:***';
      }
      await interaction.followUp(message);
    }
  }
}
