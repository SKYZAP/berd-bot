import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play some sweet moosic")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Enter Youtube/Spotify links or keywords")
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      // Check for voice channel
      if (!interaction.member.voice.channelId)
        return await interaction.reply({
          content: "You are not in a voice channel!",
          ephemeral: true,
        });
      if (
        interaction.guild.me.voice.channelId &&
        interaction.member.voice.channelId !==
          interaction.guild.me.voice.channelId
      )
        return await interaction.reply({
          content: "You are not in my voice channel!",
          ephemeral: true,
        });
      // Gets song keywords/url
      const query = interaction.options.get("query").value;
      const queue = player.createQueue(interaction.guild, {
        metadata: {
          channel: interaction.channel,
        },
      });

      // verify vc connection
      try {
        if (!queue.connection)
          await queue.connect(interaction.member.voice.channel);
      } catch {
        queue.destroy();
        return await interaction.reply({
          content: "Could not join your voice channel!",
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      const track = await player
        .search(query, {
          requestedBy: interaction.user,
        })
        .then((x) => x.tracks[0]);
      if (!track)
        return await interaction.followUp({
          content: `❌ | Track **${query}** not found!`,
        });

      queue.play(track);
      return await interaction.followUp({
        content: `⏱️ | Loading track **${track.title}**!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
