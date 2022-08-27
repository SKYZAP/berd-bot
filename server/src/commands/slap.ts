import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap your friends virtually")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select slap target")
        .setRequired(true),
    ),
  async execute(interaction) {
    const random = Math.floor(Math.random() * 100);
    const user = interaction.options.getUser("target");
    let message = "";

    await interaction.deferReply();

    if (!user)
      return await interaction.followUp({
        content: "***User not found***",
        ephemeral: true,
      });
    if (user.id === interaction.user.id) {
      await interaction.followUp("***You can't slap yourself***");
    } else if (user.id === process.env.DISCORD_CLIENTID) {
      await interaction.followUp(
        "***Berd-Bot gives you a disappointed stare***",
      );
    } else {
      if (random >= 0 && random < 80) {
        message = `***${user} was slapped :clap:***`;
      } else if (random >= 80 && random <= 99) {
        message = "***You were confused and slapped yourself***";
      } else {
        message = "***:clap: Berd-Bot has slapped you himself :clap:***";
      }
      await interaction.followUp(message);
    }
  },
};
