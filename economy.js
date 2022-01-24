const profileSchema = require("./schemas/ecoschema");
const { connBoilerPlate } = require("./utils/conn-util");

const coinsCache = {}; // { 'guildId-userId': coins }

module.exports = {
  addCoins: connBoilerPlate(async ({ guildId, userId, coins }) => {
    // console.log('Running findOneAndUpdate()')
    const result = await profileSchema.findOneAndUpdate(
      { guildId, userId },
      { guildId, userId, $inc: { coins } },
      { upsert: true, new: true }
    );

    // console.log('RESULT:', result)

    coinsCache[`${guildId}-${userId}`] = result.coins;

    return result.coins;
  }),

  getCoins: connBoilerPlate(async ({ guildId, userId }) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`];
    // console.log({ cachedValue })
    if (cachedValue || cachedValue == 0) {
      return cachedValue;
    }
    // console.log('Running findOne()')
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    // console.log('RESULT:', result)

    let coins = 0;
    if (result) {
      coins = result.coins;
    } else {
      // console.log('Inserting a document')
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
