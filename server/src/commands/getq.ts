import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";
import { paginate } from "../utils/paginate";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getq")
    .setDescription("Gets all the songs in the queue"),
  async execute(interaction) {
    try {
      const { MessageEmbed, MessageButton } = require("discord.js");
      const _ = require("lodash");
      const paginationEmbed = require("discordjs-button-pagination");
      // Check for voice channel
      ChannelCheck(interaction);

      // Gets current queue
      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }
      // Check queued up songs
      if (queue.tracks.length <= 0) {
        return await interaction.reply({
          content: "Only 1 song is being played, queue more songs!",
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      const qPages = paginate(queue.tracks, 5);
      const pagesEmbed = [];

      const b2 = new MessageButton()
        .setCustomId("previousbtn")
        .setLabel("Previous")
        .setStyle("DANGER");

      const b1 = new MessageButton()
        .setCustomId("nextbtn")
        .setLabel("Next")
        .setStyle("SUCCESS");

      const buttonList = [b1, b2];

      _.forEach(qPages, (page, index) => {
        const embed = new MessageEmbed().setTitle(`Queue Page ${index + 1}`);
        _.forEach(page, (p, i) => {
          embed.addFields({
            name: `Song ${i + index * 5 + 1}`,
            value: `${p.title} by ${p.author}`,
          });
        });
        pagesEmbed.push(embed);
      });

      return await paginationEmbed(interaction, pagesEmbed, buttonList, 120000);
    } catch (error) {
      console.log(error.message);
    }
  },
};
