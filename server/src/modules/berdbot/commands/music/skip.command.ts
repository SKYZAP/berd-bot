import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ChannelCheck, PlayerCheck } from '../../../../utils';

@Command({
  name: 'skip',
  description: 'Skips the current song',
})
@Injectable()
export class SkipCommand implements DiscordCommand {
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

      const npTrack = await queue.nowPlaying();

      if (queue.tracks.length > 0) {
        await queue.skip();
      } else {
        await queue.destroy(true);
      }

      await interaction.reply({
        content: `⏩ | ${
          npTrack ? `Track **${npTrack}` : '**Current track'
        }** has been skipped!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
