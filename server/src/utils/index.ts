import { Player } from 'discord-player';
import { GuildMember, TextChannel } from 'discord.js';

export const PaginateArray = (arr, size) => {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
};

export const CheckValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const CheckValidObjectID = (id) => {
  return String(id).match(/^[0-9a-fA-F]{24}$/);
};

export const CapitalizeFirstLetter = (string) => {
  string = string.toLowerCase();
  let words = string.split(' ');
  let newString = '';
  for (let i = 0; i < words.length; i++) {
    if (!(i == words.length - 1)) {
      newString =
        newString + words[i].charAt(0).toUpperCase() + words[i].slice(1) + ' ';
    } else {
      newString =
        newString + words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return newString;
};

// Music Utility Functions
export const ChannelCheck = async (
  interaction,
  currentUser: GuildMember,
  type: string | null,
) => {
  if (!interaction.guild.members.me.voice.channelId && type !== 'play') {
    await interaction.reply({
      content: "I'm not even in the voice channel!",
      ephemeral: true,
    });
  }

  if (!currentUser.voice.channelId) {
    await interaction.reply({
      content: 'You are not in a voice channel!',
      ephemeral: true,
    });
  }

  if (
    currentUser.voice.channelId !==
      interaction.guild.members.me.voice.channelId &&
    type !== 'play'
  ) {
    await interaction.reply({
      content: 'You are not in my voice channel!',
      ephemeral: true,
    });
  }
};

export const PlayerCheck = (interaction) => {
  if (!global.player) {
    const player = new Player(interaction.client);
    player.on('trackStart', (queue, track) =>
      (
        interaction.client.channels.cache.get(
          interaction.channelId,
        ) as TextChannel
      ).send(`🎶 | Now playing **${track.title}**!`),
    );
    global.player = player;
  }
};
