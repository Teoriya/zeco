const economy = require("../../economy");

module.exports = {
  aliases: ["ac", "rc", "removecoins", "addcoins"],
  category: "Economy",
  description: "Adds coins to the tagged user",
  slash: false,
  expectedArgs: "<@mention> <amount to be added>",
  minArgs: 2,
  maxArgs: 2,
  syntaxError: "Oops syntax error. Use `{PREFIX}`addcoins {ARGUMENTS}",
  cooldown: "5s",
  guildOnly: true,
  slash: false,
  callback: async ({ message, args, prefix }) => {
    const mention = message.mentions.users.first();
    // console.log(args)

    if (!mention) {
      message.reply("Please tag a user to add coins to.");
      return;
    }
    alias = message.content.split(" ").shift().charAt(prefix.length);

    const coins = alias == "r" ? args[1] * -1 : args[1];
    if (isNaN(coins)) {
      message.reply("Please provide a valid numnber of coins.");
      return;
    }

    const guildId = message.guild.id;
    const userId = mention.id;

    //Added balance checker before removing coins <open>
    const balCoins = await economy.getCoins({ guildId, userId });
    if (balCoins + coins < 0) {
      message.reply("Balance cannot be negative.");
      return;
    }
    //Added balance checker before removing coins <close>

    const newCoins = await economy.addCoins({ guildId, userId, coins });

    message.reply(`<@${userId}> now have ${newCoins} coin(s)!`);
  },
};
