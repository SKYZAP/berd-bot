import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ChannelCheck, PlayerCheck } from '../../../../utils';

@Command({
  name: 'stop',
  description: 'Stops the current music session',
})
@Injectable()
export class StopCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction) {
    try {
      PlayerCheck(interaction);

      const currentUser: GuildMember = await interaction.guild.members.fetch(
        interaction.user,
      );

      // Check for voice channel
      await ChannelCheck(interaction, currentUser, null);

      const queue = await global.player.getQueue(interaction.guildId);
      if (!queue) {
        await interaction.reply({
          content: '❌ | The queue is not found!',
          ephemeral: true,
        });
      }

      if (queue.playing) {
        await queue.destroy(true);
      }

      await interaction.reply({
        content: `:stop_sign: | **Music player has been stopped!!**`,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
