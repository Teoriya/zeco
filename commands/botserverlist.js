const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botserverlist",
  aliases: ["bsl"],
  category: "Configuration",
  description: "List of all servers the bot is in",
  expectedArgs: " ",
  minArgs: 0,
  maxArgs: 0,
  guildOnly: true,
  slash: false,
  ownerOnly: true,

  callback: async ({ message, client, channel }) => {
    client.guilds.cache.map(async (guild) => {
      guildId = guild.id;
      sChannel = await guild.channels.cache.filter(
        (c) => c.type === "GUILD_TEXT"
      );
      invite = await sChannel
        .first()
        .createInvite({
          maxAge: 0,
          maxUses: 0,
          reason: "Invite created by ZEcobot.",
        });
      // console.log({invite})
      channel.send(`**__${guild}__** with \`${guild.memberCount}\`  members`);
      let logEmbed = new MessageEmbed()
        .setTitle(`**__${guild}__** -> ${guild.id}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(
          `Owner Info`,
          `<@${guild.ownerId}> with ID **${guild.ownerId}**`
        )
        .addField(`Server Info`, `Member Count -> **__${guild.memberCount}__**`)
        .addField(`Joined At:`, `${guild.joinedAt}`)
        .addField("Invite:", `${invite}`);

      channel.send({ embeds: [logEmbed] });
    });
  },
};
