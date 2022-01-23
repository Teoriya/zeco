const pvcsys = require('../../pvcsystem')
const economy = require('../../economy')
const {Message,MessageActionRow,MessageButton, Collector, ButtonInteraction} = require("discord.js")

cache = []

module.exports = {
    aliases: ['br'],
    category: 'PVC',
    description: 'Creates PVC',
    slash: false,
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 2,
    syntaxError: 'Oops syntax error. Use `{PREFIX}`balance {ARGUMENTS}',
    // cooldown: '60s',
    guildOnly: true,
    slash: false,
    callback: async ({ message, text }) => {

        //check wpvc

        guildId= message.guild.id
        userId = message.author.id

        userCoins =await economy.getCoins({guildId,userId})
        
        
        //
        // console.log(text);
        let matches = text.match(/\d+/g);
        let letters = text.match(/\D+/g) || [];
        let time = 0;
        // console.log({ matches, letters });
        if ((new Set(letters)).size !== letters.length) console.log("Error"); // Checking for duplicates
        for (let i = 0; i < letters.length; i++) { // Converting in seconds
            if (letters[i][0] == 'h') time += matches[i] * 60 * 60;
            if (letters[i][0] == 'm') time += matches[i] * 60;
            if (letters[i][0] == 's') time += matches[i] * 1;
        }
        if (matches.length - 1 == letters.length) time += matches[letters.length] * 1;
        // console.log({time});
        if(time<60) {await message.reply("Create a PVC of atlest 1 min. ||Dont be a CHEAPDA||") ;
        return};
        let currentDate = message.createdTimestamp.toString().slice(0,-3);
        // console.log({currentDate})

        currentDate = parseInt(currentDate)

        endDate = currentDate + time;
        // date = new Date(endDate).toUTCString()

        // interval = date - currentDate
        // console.log({interval})
        // console.log({message});
        // console.log(message.author.username + "'s PVC created till: " + new Date(endDate).toUTCString() );
        
        cost = time*2
        
        if(userCoins<cost)
        {
            message.reply(`Insufficient Coins. You need ${cost} coins and you have ${userCoins} only`)
            return 
        }
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("accept")
                .setLabel("Continue")
                .setStyle("SUCCESS"),

            new MessageButton()
                .setCustomId("reject")
                .setLabel("Cancel")
                .setStyle("DANGER")
        )
        if(cache.includes(message.author.id)){
            errMsg = await message.reply("You have a pending transaction above please wait atleast 30s or respond to the previous message.");
            
            return;
        }
        message.reply({content:`This trans would cost you ${cost}`, components: [row]})
        cache.push(message.author.id)

        filter = (interaction) =>{
            if (interaction.user.id === message.author.id){return true}
            return interaction.reply({content:"Not your button to click", ephemeral:true})
        }

         const collector = message.channel.createMessageComponentCollector({filter,max:1,time:30000})

        await collector.on("end",async (ButtonInteraction) => {
            cache = cache.filter((value,index,array) => value != message.author.id)
            let btnreply = ButtonInteraction.first().customId
            console.log(btnreply)
            if (btnreply=="reject")
         {return await ButtonInteraction.first().reply({content:"CANCELLED",ephemeral:true})}
            await ButtonInteraction.first().reply({content:"Transaction Processed"})

            const {categId} = await pvcsys.findCateg({guildId})

            

            let parent = await message.guild.channels.fetch(categId)
            textChannel = await message.guild.channels.create(message.author.username,{parent})
            voiceChannel = await message.guild.channels.create(message.author.username,{parent,type:"GUILD_VOICE"})
            await textChannel.edit({topic:`${message.author.username}'s Private text channel`,nsfw:false,rateLimitPerUser:1})
            await textChannel.permissionOverwrites.edit(message.author.id,{"ADD_REACTIONS":true ,"VIEW_CHANNEL":true,"SEND_MESSAGES":true,"READ_MESSAGE_HISTORY":true,"CREATE_INSTANT_INVITE":true,"EMBED_LINKS":true,"ATTACH_FILES":true,"USE_EXTERNAL_EMOJIS":true},{reason:"PVC created",type:1})
            await voiceChannel.edit({userLimit:1})
            await textChannel.permissionOverwrites.edit(message.author.id,{"STREAM":true,"VIEW_CHANNEL":true,"CONNECT":true,"SPEAK":true},{reason:"PVC created",type:1})
            await economy.addCoins({guildId,userId,coins:-1*cost})
            
            // timeRem = endDate - currentDate
            // endDate = endDate.toString()
            helpMessage = await textChannel.send({content:`Pvc ends <t:${endDate}:R>`})//embed bhi add krna help vaala
            await helpMessage.pin()
            // console.log(`Time Remaining: <t:${endDate}:R>`)

            // console.log({endDate})
            // console.log({timeRem})

            textId=textChannel.id
            vcId=voiceChannel.id
            messageId=helpMessage.id
            endTime = endDate
            await pvcsys.pvcCreate({guildId,userId,textId,vcId,messageId,endTime})
         })
         

    }
    
}