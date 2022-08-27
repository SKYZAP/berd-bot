import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("speak")
    .setDescription("Make the bot SPEAK")
    .addStringOption((option) =>
      option.setName("text").setDescription("Voice text").setRequired(true),
    ),
  async execute(interaction) {
    try {
      const {
        AudioPlayer,
        createAudioResource,
        StreamType,
        entersState,
        VoiceConnectionStatus,
        joinVoiceChannel,
      } = require("@discordjs/voice");
      const discordTTS = require("discord-tts");
      let voiceConnection;
      let audioPlayer = new AudioPlayer();
      const channel = interaction.member.voice.channel;

      let message = interaction.options.get("text").value;
      if (message.length >= 200) {
        message = message.slice(0, 199);
      }

      const stream = discordTTS.getVoiceStream(message);
      const audioResource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
      });

      // Check for voice channel
      if (!interaction.member.voice.channelId)
        return await interaction.reply({
          content: "You are not in a voice channel!",
          ephemeral: true,
        });
      if (
        interaction.guild.me.voice.channelId &&
        interaction.member.voice.channelId !==
          interaction.guild.me.voice.channelId
      )
        return await interaction.reply({
          content: "You are not in my voice channel!",
          ephemeral: true,
        });

      voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      voiceConnection = await entersState(
        voiceConnection,
        VoiceConnectionStatus.Ready,
      );

      if (voiceConnection._state.status === VoiceConnectionStatus.Ready) {
        voiceConnection.subscribe(audioPlayer);
        audioPlayer.play(audioResource);
      }

      return await interaction.reply({
        content: "***`Chirp`***",
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
