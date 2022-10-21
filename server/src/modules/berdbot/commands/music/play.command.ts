import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { GuildMember } from 'discord.js';
import { ChannelCheck, PlayerCheck } from '../../../../utils';
import { PlayDto } from '../../dto/music/play.dto';
const { QueryType } = require('discord-player');

@Command({
  name: 'play',
  description: 'Plays a song',
})
@UsePipes(TransformPipe)
export class PlayCommand implements DiscordTransformedCommand<PlayDto> {
  async handler(
    @Payload() dto: PlayDto,
    { interaction }: TransformedCommandExecutionContext,
  ) {
    try {
      PlayerCheck(interaction);

      const musicPlayer = await global.player;

      const currentUser: GuildMember = await interaction.guild.members.fetch(
        interaction.user,
      );

      await ChannelCheck(interaction, currentUser, 'play');

      // Gets song keywords/url
      const query = dto.query;
      const queue = musicPlayer.createQueue(interaction.guild, {
        ytdlOptions: {
          filter: 'audioonly',
          highWaterMark: 1 << 30,
          dlChunkSize: 0,
        },
        metadata: {
          channel: interaction.channel,
        },
      });

      // verify vc connection
      try {
        if (!queue.connection) await queue.connect(currentUser.voice.channel);
      } catch {
        queue.destroy();
        await interaction.reply({
          content: 'Could not join your voice channel!',
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      const track = await musicPlayer
        .search(query, {
          searchEngine: QueryType.AUTO,
          requestedBy: interaction.user,
        })
        .then((x) => x.tracks[0]);

      if (!track)
        await interaction.followUp({
          content: `❌ | Track **${query}** not found!`,
        });

      await queue.play(track);
      await interaction.followUp({
        content: `⏱️ | Loading track **${track.title}**!`,
      });
    } catch (error) {
      console.log('ERROR: ', error);
      // console.log(error.message);
    }
  }
}
