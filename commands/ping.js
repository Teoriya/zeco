
module.exports = {
  name: "ping",
  aliases: ['hi'],
  category: 'Configuration',
  description: 'Checks ping',
  expectedArgs: ' ',
  minArgs: 0,
  maxArgs: 0,
  guildOnly: true,
  slash: "both",

  callback: ({message, client}) => {
    message.reply('Calculating ping...').then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp
      resultMessage.reply(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)
    })
  },
}