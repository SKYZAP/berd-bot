import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("destroy")
    .setDescription("Destroys the current music session"),
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

      if (queue.playing) {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `:stop_sign: | **Music player has been stopped!!**`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
