const pvcsys = require("../../pvcsystem");
const economy = require("../../economy");
const {
  Message,
  MessageActionRow,
  MessageButton,
  Collector,
  ButtonInteraction,
} = require("discord.js");

cache = [];

module.exports = {
  aliases: ["delpvc"],
  category: "PVC",
  description: "Deletes PVC",
  slash: false,
  expectedArgs: "",
  minArgs: 0,
  maxArgs: 2,
  syntaxError: "Oops syntax error. Use `{PREFIX}`balance {ARGUMENTS}",
  // cooldown: '60s',
  guildOnly: true,
  slash: false,
  callback: async ({ message, client }) => {
    //check wpvc

    guildId = message.guild.id;
    userId = message.author.id;
    textId = message.channel.id;

    const result = await pvcsys.findPVC({ guildId, textId });
    if (!result || result.userId !== userId) {
      console.log("Error");
      return;
    }
    let currentDate = message.createdTimestamp.toString().slice(0, -3);

    currentDate = parseInt(currentDate);
    const endTimePVC = parseInt(result.endTime);
    const refund = endTimePVC - currentDate;

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("accept")
        .setLabel("Continue")
        .setStyle("SUCCESS"),

      new MessageButton()
        .setCustomId("reject")
        .setLabel("Cancel")
        .setStyle("DANGER")
    );
    if (cache.includes(message.author.id)) {
      errMsg = await message.reply(
        "You have a pending transaction please wait atleast 30s or respond to the previous message."
      );

      return;
    }
    message.reply({
      content: `You will be refunded only half coins for the remaining time i.e. ${refund}.`,
      components: [row],
    });
    cache.push(message.author.id);

    filter = (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      return interaction.reply({
        content: "Not your button to click",
        ephemeral: true,
      });
    };

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
      time: 30000,
    });

    await collector.on("end", async (ButtonInteraction) => {
      cache = cache.filter((value, index, array) => value != message.author.id);
      if (!ButtonInteraction.first()) {
        console.log("Time limit");
        return;
      }
      let btnreply = ButtonInteraction.first().customId;
      // console.log(btnreply);
      if (btnreply == "reject") {
        return await ButtonInteraction.first().reply({
          content: "CANCELLED",
          ephemeral: true,
        });
      }
      await ButtonInteraction.first().reply({
        content: "Refund initiated...",
      });

      await economy.addCoins({ guildId, userId, coins: refund });
      await pvcsys.deletePVC({ guildId, userId });
      txt = await client.channels.fetch(result.textId);
      vc = await client.channels.fetch(result.vcId);
      await txt.delete();
      await vc.delete();
    });
  },
};
