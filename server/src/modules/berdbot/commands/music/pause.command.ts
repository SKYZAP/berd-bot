import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ChannelCheck, PlayerCheck } from '../../../../utils';

@Command({
  name: 'pause',
  description: 'Pauses the current music session',
})
@Injectable()
export class PauseCommand implements DiscordCommand {
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

      const currentTrack = await queue.nowPlaying();

      if (queue.playing) {
        await queue.setPaused(true);
      } else {
        await queue.destroy(true);
      }

      await interaction.reply({
        content: `:pause_button: | ${
          currentTrack ? `Track **${currentTrack}` : '**Current track'
        }** has been paused!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
