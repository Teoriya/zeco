const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = async(client,) => {
    client.on(`guildCreate`, async (guild) => {
        let logChannel = client.channels.cache.get(process.env.serverLog)
        guildId=guild.id
        channel = await guild.channels.cache.filter(c => c.type === 'GUILD_TEXT')
        invite = await channel.first().createInvite({maxAge:0,maxUses:0,reason:"Invite created by ZEcobot."})
        // console.log({invite})
        logChannel.send(`Bot added to **__${guild}__** with \`${guild.memberCount}\`  members`)
        let logEmbed = new MessageEmbed()
          .setTitle(`**__${guild}__** -> ${guild.id}`)
          .setThumbnail(guild.iconURL({dynamic:true})) 
          .addField(`Owner Info`, `<@${guild.ownerId}> with ID **${guild.ownerId}**`)
          .addField(`Server Info`, `Member Count -> **__${guild.memberCount}__**`)
          .addField(`Joined At:`, `${guild.joinedAt}`)
          .addField('Invite:',`${invite}`)
        
        logChannel.send({embeds: [logEmbed]})
      })
  }
  
  module.exports.config = {
    displayName: 'ZEco BOT',
    dbName: 'botdb'
  }