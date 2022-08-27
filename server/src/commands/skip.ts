import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current song"),
  async execute(interaction) {
    try {
      // Check for voice channel
      ChannelCheck(interaction);

      // Actual /skip function
      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      const npTrack = await queue.nowPlaying();

      if (queue.tracks.length > 0) {
        await queue.skip();
      } else {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `⏩ | ${
          npTrack ? `Track **${npTrack}` : "**Current track"
        }** has been skipped!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
