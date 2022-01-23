const pvcsys = require('../../pvcsystem')
module.exports = {
    aliases: ['set'],
    category: 'PVC',
    description: 'Sets Up the Pvc System',
    slash: false,
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'Oops syntax error. Use `{PREFIX}`balance {ARGUMENTS}',
    cooldown: '60s',
    guildOnly: true,
    slash: false,
    callback: async ({ message }) => {
        parent = await message.guild.channels.create("PVCS", { type: "GUILD_CATEGORY" });
        categId=parent.id
        guildId=message.guild.id
        channel = await message.guild.channels.create("pvc-commands",{parent})
        chanId = channel.id
        await pvcsys.setup({guildId,categId,chanId})
        
        // x= await pvcsys.findCateg({guildId})
        // await console.log(categId)
        await message.reply("category created with id "+ categId)
    }
    


}