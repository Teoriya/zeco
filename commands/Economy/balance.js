const economy = require("../../economy");

module.exports = {
  aliases: ["bal", "coins"],
  category: "Economy",
  description: "Checks balance",
  slash: false,
  expectedArgs: "[@mention]",
  minArgs: 0,
  maxArgs: 1,
  syntaxError: "Oops syntax error. Use `{PREFIX}`balance {ARGUMENTS}",
  cooldown: "5s",
  guildOnly: true,
  slash: false,
  callback: async ({ message }) => {
    const target = message.mentions.users.first() || message.author;
    // console.log(message.mentions.users.first());
    // console.log(message.author);
    const guildId = message.guild.id;
    const userId = target.id;

    const coins = await economy.getCoins({ guildId, userId });

    message.reply(`That user has ${coins} coins!`);
  },
};
