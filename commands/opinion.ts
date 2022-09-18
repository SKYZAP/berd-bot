import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("opinion")
    .setDescription("For bad opinions!")
    .addStringOption((option) =>
      option.setName("text").setDescription("A bad opinion").setRequired(true),
    ),
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
      const memeText = interaction.options.getString("text");
      const memeImage = await canvacord.Canvas.opinion(userImage, memeText);
      const file = new MessageAttachment(memeImage, "op.png");

      const embedMessage = {
        image: {
          url: "attachment://op.png",
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
