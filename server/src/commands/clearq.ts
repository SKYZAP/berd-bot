import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearq")
    .setDescription("Clears all the songs in the queue"),
  async execute(interaction) {
    try {
      // Check for voice channel
      ChannelCheck(interaction);

      // Clear function
      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      if (queue.playing) {
        await queue.clear();
      } else {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `:regional_indicator_x: | **Queue has been cleared**`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
