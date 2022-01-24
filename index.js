require('dotenv').config();//process.env.TOKEN
const Discord = require('discord.js');
const path = require('path')
const WOKCommands = require('wokcommands')
const client = new Discord.Client({ intents: [Object.keys(Discord.Intents.FLAGS)] })
const fs = require("fs");
const machineId = fs.readdirSync(`./machine/`)[0]
if(machineId == "entermachineid")
{
    console.log("rename the file in  ./machine/entermachineid")
    return
}

owners = process.env.OWNERS.split(',')
servers = process.env.SERVERS.split(',')

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        delErrMsgCooldown: 5,
        defaultLangauge: 'english',
        ignoreBots: true,
        testServers: servers ,
        botOwners: owners,
        disabledDefaultCommands: [
             'language',
        ],
        mongoUri: process.env.DBURL,
    })
    let logChannel = client.channels.cache.get(process.env.onlineLog)
    logChannel.send(`Bot online - MACHINE - ${machineId}`)
})

client.login(process.env.TOKEN1)