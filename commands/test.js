const pvcSys = require("../pvcsystem")

module.exports = {
  name: "test",
  aliases: [''],
  category: 'Configuration',
  description: 'Checks ping',
  expectedArgs: ' ',
  minArgs: 0,
  maxArgs: 1,
  guildOnly: true,
  slash: "both",

  callback: async({message, text}) => {
      console.log(message.content)
      coll = await message.guild.members.search({query:text, cache:true, limit:100});
      let a = [];
      await coll.map((guild) => {
        a.push(`${guild.user.id} - ${guild.user.tag}`)
      });
      console.log(a);
      b = {
        embeds: [{
          title: 'Users List',
          description: `${a.join('\n')}`,
          // image: {url: 'image url'}
        }]
      }
      message.reply(b);
      // message.reply(`Users: ${a +"\nsize: "+ a.length}`);
      // 18 digit id
      // 4 digit discriminator
      // Username
      // console.log(await pvcSys.pvcGetData({}))
  },
}