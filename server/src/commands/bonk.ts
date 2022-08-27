import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bonk")
    .setDescription("Bonk your friends!")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Someone you want to bonk")
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const Canvas = require("canvas");
      const { MessageAttachment } = require("discord.js");

      // Get Users + Profile Image
      await interaction.deferReply();
      const bonkTarget = interaction.options.getUser("target");
      const bonkTargetImage = bonkTarget.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
      const bonkAuthorImage = interaction.user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      const background = await Canvas.loadImage(
        "https://i.imgur.com/roAhInZ.jpg",
      );

      // Load the images and draw them onto the canvas
      const authorAvatar = await Canvas.loadImage(bonkAuthorImage);
      const targetAvatar = await Canvas.loadImage(bonkTargetImage);

      const canvas = Canvas.createCanvas(720, 492);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(authorAvatar, 210, 115, 120, 120);
      ctx.drawImage(targetAvatar, 435, 270, 120, 120);

      const image = canvas.toBuffer();
      let file = new MessageAttachment(image, "bonk.jpeg");
      const embedMessage = {
        title: `Get bonked ${bonkTarget.username}!!`,
        image: {
          url: "attachment://bonk.jpeg",
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
