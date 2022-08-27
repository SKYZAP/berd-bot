import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ohno")
    .setDescription("For dumb opinions!")
    .addStringOption((option) =>
      option.setName("text").setDescription("A dumb opinion").setRequired(true),
    ),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      await interaction.deferReply();
      const memeText = interaction.options.getString("text");
      const memeImage = await canvacord.Canvas.ohno(memeText);
      const file = new MessageAttachment(memeImage, "ohno.png");

      const embedMessage = {
        image: {
          url: "attachment://ohno.png",
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
