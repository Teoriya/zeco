const profileSchema = require("./schemas/ecoschema");
const { connBoilerPlate } = require("./utils/conn-util");

const coinsCache = {}; // { 'guildId-userId': coins }

module.exports = {
  addCoins: connBoilerPlate(async ({ guildId, userId, coins }) => {
    const result = await profileSchema.findOneAndUpdate(
      { guildId, userId },
      { guildId, userId, $inc: { coins } },
      { upsert: true, new: true }
    );

    coinsCache[`${guildId}-${userId}`] = result.coins;

    return result.coins;
  }),

  getCoins: connBoilerPlate(async ({ guildId, userId }) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`];
    if (cachedValue || cachedValue == 0) {
      return cachedValue;
    }
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    let coins = 0;
    if (result) {
      coins = result.coins;
    } else {
      await new profileSchema({
        guildId,
        userId,
        coins,
      }).save();
    }

    coinsCache[`${guildId}-${userId}`] = coins;
    return coins;
  }),
};
