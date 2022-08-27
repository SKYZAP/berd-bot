import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current song"),
  async execute(interaction) {
    try {
      // Check for voice channel
      ChannelCheck(interaction);

      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      const npTrack = await queue.nowPlaying();

      if (queue.playing) {
        await queue.setPaused(true);
      } else {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `:pause_button: | ${
          npTrack ? `Track **${npTrack}` : "**Current track"
        }** has been paused!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
