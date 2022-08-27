import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove a specified song from the queue")
    .addIntegerOption((option) =>
      option
        .setName("position")
        .setDescription("Position of song in queue")
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const position = interaction.options.get("position").value;
      // Check for voice channel
      ChannelCheck(interaction);

      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      const removedTrack = await queue.tracks[position - 1].title;

      if (queue.playing) {
        await queue.remove(position - 1);
      } else {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `:x: | Track ${removedTrack} has been removed from queue!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
