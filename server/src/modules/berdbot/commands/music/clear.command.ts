import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ChannelCheck, PlayerCheck } from '../../../../utils';

@Command({
  name: 'clear',
  description: 'Clears the current music queue',
})
@Injectable()
export class ClearCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction) {
    try {
      PlayerCheck(interaction);

      const currentUser: GuildMember = await interaction.guild.members.fetch(
        interaction.user,
      );

      // Check for voice channel
      await ChannelCheck(interaction, currentUser, null);

      // Clear function
      const queue = await global.player.getQueue(interaction.guildId);
      if (!queue) {
        await interaction.reply({
          content: '❌ | The queue is not found!',
          ephemeral: true,
        });
      }

      if (queue.playing) {
        await queue.clear();
      } else {
        await queue.destroy(true);
      }

      await interaction.reply({
        content: `:regional_indicator_x: | **Queue has been cleared**`,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
