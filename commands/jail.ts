import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jail")
    .setDescription("Jail someone for their heresy")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Dood you're jailing")
        .setRequired(false),
    ),
  async execute(interaction) {
    try {
      const canvacord = require("canvacord");
      const { MessageAttachment } = require("discord.js");

      await interaction.deferReply();
      const jailTarget = interaction.options.getUser("target");
      let jailTargetImage;

      if (!jailTarget) {
        jailTargetImage = interaction.user.displayAvatarURL({
          dynamic: false,
          format: "png",
        });
      } else {
        jailTargetImage = jailTarget.displayAvatarURL({
          dynamic: false,
          format: "png",
        });
      }

      const image = await canvacord.Canvas.jail(jailTargetImage, true);
      const file = new MessageAttachment(image, "jail.png");

      const embedMessage = {
        title: "Jail time",
        image: {
          url: "attachment://jail.png",
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
