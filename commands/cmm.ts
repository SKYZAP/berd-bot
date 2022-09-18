import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cmm")
    .setDescription("Change my mind!")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("An unchanging opinion")
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      // Get meme text
      await interaction.deferReply();
      const memeText = interaction.options.getString("text");
      const memeImage = await canvacord.Canvas.changemymind(memeText);
      const file = new MessageAttachment(memeImage, "cmm.png");

      const embedMessage = {
        title: `Literally no one: .......... \n${interaction.user.username}:`,
        image: {
          url: "attachment://cmm.png",
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
