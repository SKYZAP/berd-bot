import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import {
  CommandInteraction,
  GuildMember,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { ChannelCheck, PaginateArray, PlayerCheck } from '../../../../utils';

// REMAKE PAGINATED QUEUE
@Command({
  name: 'get-queue',
  description: 'Gets the current music queue',
})
@Injectable()
export class QueueCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction) {
    try {
      const _ = require('lodash');
      const paginationEmbed = require('discordjs-button-pagination');

      PlayerCheck(interaction);

      const currentUser: GuildMember = await interaction.guild.members.fetch(
        interaction.user,
      );

      // Check for voice channel
      await ChannelCheck(interaction, currentUser, null);

      // Gets current queue
      const queue = await global.player.getQueue(interaction.guildId);
      if (!queue) {
        await interaction.reply({
          content: '❌ | The queue is not found!',
          ephemeral: true,
        });
      }

      // Check queued up songs
      if (queue.tracks.length <= 0) {
        await interaction.reply({
          content: 'Only 1 song is being played, queue more songs!',
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      const qPages = PaginateArray(queue.tracks, 5);
      const pagesEmbed = [];

      const b2 = new ButtonBuilder()
        .setCustomId('previousbtn')
        .setLabel('Previous')
        .setStyle(ButtonStyle.Danger);

      const b1 = new ButtonBuilder()
        .setCustomId('nextbtn')
        .setLabel('Next')
        .setStyle(ButtonStyle.Success);

      const buttonList = [b1, b2];

      _.forEach(qPages, (page, index) => {
        const embed = new EmbedBuilder().setTitle(`Queue Page ${index + 1}`);
        _.forEach(page, (p, i) => {
          embed.addFields({
            name: `Song ${i + parseFloat(index) * 5 + 1}`,
            value: `${p.title} by ${p.author}`,
          });
        });
        pagesEmbed.push(embed);
      });

      await paginationEmbed(interaction, pagesEmbed, buttonList, 120000);
    } catch (error) {
      console.log(error.message);
    }
  }
}
