require('dotenv').config();//process.env.TOKEN
const Discord = require('discord.js');
const path = require('path')
const WOKCommands = require('wokcommands')
const client = new Discord.Client({ intents: [Object.keys(Discord.Intents.FLAGS)] })
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const url = `mongodb://${dbHost}:${dbPort}/${dbName}`

client.on('ready', () => {
    const wok = new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        delErrMsgCooldown: 5,
        defaultLangauge: 'english',
        ignoreBots: true,
        testServers:'884393176255848498' ,
        mongoUri: url
    })
})

client.login(process.env.TOKEN1)