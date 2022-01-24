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
  callback: async ({ message, text, client }) => {
    //check wpvc

    guildId = message.guild.id;
    userId = message.author.id;
    textId = message.channel.id;

    userCoins = await economy.getCoins({ guildId, userId });

    let currentDate = message.createdTimestamp.toString().slice(0, -3);
    // console.log({currentDate})

    currentDate = parseInt(currentDate);

    const result = await pvcsys.deletePVC({ guildId, textId });
    // console.log(result);
    if (!result || result.userId !== userId) {
      console.log("Error");
      return;
    }
    const endTimePVC = parseInt(result.endTime);
    const refund = endTimePVC - currentDate;
    console.log(refund);
    txt = await client.channels.fetch(result.textId);
    vc = await client.channels.fetch(result.vcId);
    await txt.delete();
    await vc.delete();
    // interval = date - currentDate
    // console.log({interval})
    // console.log({message});
    // console.log(message.author.username + "'s PVC created till: " + new Date(endDate).toUTCString() );

    //   cost = time * 2;

    //   if (userCoins < cost) {
    //     message.reply(
    //       `Insufficient Coins. You need ${cost} coins and you have ${userCoins} only`
    //     );
    //     return;
    //   }
    //   const row = new MessageActionRow().addComponents(
    //     new MessageButton()
    //       .setCustomId("accept")
    //       .setLabel("Continue")
    //       .setStyle("SUCCESS"),

    //     new MessageButton()
    //       .setCustomId("reject")
    //       .setLabel("Cancel")
    //       .setStyle("DANGER")
    //   );
    //   if (cache.includes(message.author.id)) {
    //     errMsg = await message.reply(
    //       "You have a pending transaction above please wait atleast 30s or respond to the previous message."
    //     );

    //     return;
    //   }
    //   message.reply({
    //     content: `This trans would cost you ${cost}`,
    //     components: [row],
    //   });
    //   cache.push(message.author.id);

    //   filter = (interaction) => {
    //     if (interaction.user.id === message.author.id) {
    //       return true;
    //     }
    //     return interaction.reply({
    //       content: "Not your button to click",
    //       ephemeral: true,
    //     });
    //   };

    //   const collector = message.channel.createMessageComponentCollector({
    //     filter,
    //     max: 1,
    //     time: 30000,
    //   });

    //   await collector.on("end", async (ButtonInteraction) => {
    //     cache = cache.filter((value, index, array) => value != message.author.id);
    //     if (!ButtonInteraction.first()) {
    //       console.log("Time limit");
    //       return;
    //     }
    //     let btnreply = ButtonInteraction.first().customId;
    //     console.log(btnreply);
    //     if (btnreply == "reject") {
    //       return await ButtonInteraction.first().reply({
    //         content: "CANCELLED",
    //         ephemeral: true,
    //       });
    //     }
    //     await ButtonInteraction.first().reply({
    //       content: "Transaction Processed",
    //     });

    //     const { categId } = await pvcsys.findCateg({ guildId });

    //     let parent = await message.guild.channels.fetch(categId);
    //     textChannel = await message.guild.channels.create(
    //       message.author.username,
    //       { parent }
    //     );
    //     voiceChannel = await message.guild.channels.create(
    //       message.author.username,
    //       { parent, type: "GUILD_VOICE" }
    //     );
    //     await textChannel.edit({
    //       topic: `${message.author.username}'s Private text channel`,
    //       nsfw: false,
    //       rateLimitPerUser: 1,
    //     });
    //     await textChannel.permissionOverwrites.edit(
    //       message.author.id,
    //       {
    //         ADD_REACTIONS: true,
    //         VIEW_CHANNEL: true,
    //         SEND_MESSAGES: true,
    //         READ_MESSAGE_HISTORY: true,
    //         CREATE_INSTANT_INVITE: true,
    //         EMBED_LINKS: true,
    //         ATTACH_FILES: true,
    //         USE_EXTERNAL_EMOJIS: true,
    //       },
    //       { reason: "PVC created", type: 1 }
    //     );
    //     await voiceChannel.edit({ userLimit: 1 });
    //     await voiceChannel.permissionOverwrites.edit(
    //       message.author.id,
    //       { STREAM: true, VIEW_CHANNEL: true, CONNECT: true, SPEAK: true },
    //       { reason: "PVC created", type: 1 }
    //     );
    //     await economy.addCoins({ guildId, userId, coins: -1 * cost });

    //     // timeRem = endDate - currentDate
    //     // endDate = endDate.toString()
    //     helpMessage = await textChannel.send({
    //       content: `Pvc ends <t:${endDate}:R>`,
    //     }); //embed bhi add krna help vaala
    //     await helpMessage.pin();
    //     // console.log(`Time Remaining: <t:${endDate}:R>`)

    //     // console.log({endDate})
    //     // console.log({timeRem})

    //     textId = textChannel.id;
    //     vcId = voiceChannel.id;
    //     messageId = helpMessage.id;
    //     endTime = endDate;
    //     await pvcsys.pvcCreate({
    //       guildId,
    //       userId,
    //       textId,
    //       vcId,
    //       messageId,
    //       endTime,
    //     });
    //   });
  },
};
