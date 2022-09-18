import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("facepalm")
    .setDescription("For when you hear heresy!"),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      // Get meme text
      await interaction.deferReply();
      const userImage = interaction.user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
      const memeImage = await canvacord.Canvas.facepalm(userImage);
      const file = new MessageAttachment(memeImage, "face.png");

      const embedMessage = {
        image: {
          url: "attachment://face.png",
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
