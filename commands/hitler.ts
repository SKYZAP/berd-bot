import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hitler")
    .setDescription("Literally worse than hitler")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Dood you're accusing of bein hitler")
        .setRequired(false),
    ),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      await interaction.deferReply();
      const hTarget = interaction.options.getUser("target");
      let hTargetImage;

      if (!hTarget) {
        hTargetImage = interaction.user.displayAvatarURL({
          dynamic: false,
          format: "png",
        });
      } else {
        hTargetImage = hTarget.displayAvatarURL({
          dynamic: false,
          format: "png",
        });
      }

      const image = await canvacord.Canvas.hitler(hTargetImage);
      const file = new MessageAttachment(image, "hitler.png");

      const embedMessage = {
        title: "Terrible person",
        image: {
          url: "attachment://hitler.png",
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
