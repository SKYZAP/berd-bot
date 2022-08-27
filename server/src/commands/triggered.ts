import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("triggered")
    .setDescription("When you just cannot!"),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      // Get meme text
      await interaction.deferReply();
      const authorAvatar = interaction.user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
      const memeImage = await canvacord.Canvas.trigger(authorAvatar);
      const file = new MessageAttachment(memeImage, "trig.png");

      const embedMessage = {
        image: {
          url: "attachment://trig.png",
        },
      };

      return await interaction.followUp({
        embeds: [embedMessage],
        files: [file],
      });
    } catch (error) {
      console.log("[BerdBot] - ", error.message);
    }
  },
};
