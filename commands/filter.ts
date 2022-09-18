import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("filter")
    .setDescription("Sets/Resets song filters")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Filter Set or Reset")
        .setRequired(true)
        .addChoice("SET", "SET")
        .addChoice("RESET", "RESET"),
    )
    .addStringOption((option) =>
      option
        .setName("filter_name")
        .setDescription("The song filter to be used")
        .setRequired(false)
        .addChoice("BASSBOOST FILTER (NORMAL)", "bassboost")
        .addChoice("BASSBOOST FILTER (HIGH)", "bassboost_high")
        .addChoice("8-D FILTER", "8D")
        .addChoice("VAPORWAVE FILTER", "vaporwave")
        .addChoice("NIGHTCORE FILTER", "nightcore")
        .addChoice("PHASER FILTER", "phaser")
        .addChoice("TREMOLO FILTER", "tremolo")
        .addChoice("VIBRATO FILTER", "vibrato")
        .addChoice("REVERSE FILTER", "reverse")
        .addChoice("TREBLE FILTER", "treble")
        .addChoice("NORMALIZER FILTER", "normalizer")
        .addChoice("SURROUNDING FILTER", "surrounding")
        .addChoice("PULSATOR FILTER", "pulsator")
        .addChoice("SUBBOOST FILTER", "subboost")
        .addChoice("KARAOKE FILTER", "karaoke")
        .addChoice("GATE FILTER", "gate")
        .addChoice("HAAS FILTER", "haas")
        .addChoice("MCOMPAND FILTER", "mcompand")
        .addChoice("MONO FILTER", "mono")
        .addChoice("COMPRESSOR FILTER", "compressor")
        .addChoice("EXPANDER FILTER", "expander")
        .addChoice("CHORUS FILTER", "chorus")
        .addChoice("FADEIN FILTER", "fadein")
        .addChoice("DIM FILTER", "dim")
        .addChoice("EARRAPE FILTER", "earrape"),
    )
    .addBooleanOption((option) =>
      option
        .setName("filter_status")
        .setDescription("Toggle filter True or False")
        .setRequired(false),
    ),
  async execute(interaction) {
    try {
      // Get command options
      const filterType = interaction.options.get("type")?.value;
      const filterName = interaction.options.get("filter_name")?.value;
      const filterStatus = interaction.options.get("filter_status")?.value;
      let message;
      // Check for voice channel
      ChannelCheck(interaction);

      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      if (queue.playing) {
        // Filter logic
        switch (filterType) {
          case "SET": {
            if (!filterName || filterStatus == undefined) {
              return await interaction.reply({
                content: !filterName
                  ? "The filter name was not given"
                  : "The filter status was not given",
                ephemeral: true,
              });
            }
            // Retrieves previously enabled song filters
            let enabledFilters = await queue.getFiltersEnabled();
            enabledFilters = enabledFilters.map((fName) => {
              return { [fName]: true };
            });
            // Collect all filter objects into one filter array
            enabledFilters = [
              ...enabledFilters,
              { [filterName]: filterStatus },
            ];
            // Convert the Array into an object
            const filterSet = enabledFilters.reduce(
              (key, value) => Object.assign(key, value),
              {},
            );
            // Sets all the song filters
            await queue.setFilters(filterSet);
            message = `The ${filterName} filter was set to ${filterStatus} in queue`;
            break;
          }
          case "RESET": {
            const audioFilters = {
              bassboost_low: false,
              bassboost: false,
              bassboost_high: false,
              "8D": false,
              vaporwave: false,
              nightcore: false,
              phaser: false,
              tremolo: false,
              vibrato: false,
              reverse: false,
              treble: false,
              normalizer: false,
              normalizer2: false,
              surrounding: false,
              pulsator: false,
              subboost: false,
              karaoke: false,
              flanger: false,
              gate: false,
              haas: false,
              mcompand: false,
              mono: false,
              mstlr: false,
              mstrr: false,
              compressor: false,
              expander: false,
              softlimiter: false,
              chorus: false,
              chorus2d: false,
              chorus3d: false,
              fadein: false,
              dim: false,
              earrape: false,
            };

            // Reset all filters in queue
            await queue.setFilters(audioFilters);
            message = `The queue filters were reset`;
            break;
          }
          default: {
            message = "There was an error running the command";
          }
        }
      } else {
        await queue.destroy(true);
      }
      return await interaction.reply(message);
    } catch (error) {
      console.log(error);
    }
  },
};
