const { find, findByIdAndDelete } = require("./schemas/pvcschema");
const pvcSchema = require("./schemas/pvcschema");
const pvcstSchema = require("./schemas/pvcstrgschema");
const { connBoilerPlate } = require("./utils/conn-util");
cacheData = [];

module.exports = {
  setup: connBoilerPlate(async ({ guildId, categId }) => {
    // console.log('Running findOneAndUpdate()')
    await pvcSchema.findOneAndUpdate(
      { guildId },
      { guildId, categId, chanId },
      { upsert: true, new: true }
    );
  }),
  findCateg: connBoilerPlate(async ({ guildId }) => {
    // console.log(guildId)
    result = await pvcSchema.findOne({ guildId });
    // console.log({result})
    return result;
  }),
  deletePVC: connBoilerPlate(async ({ guildId, textId }) => {
    // console.log(guildId)
    result = cacheData.filter(
      (pvc) => pvc.guildId == guildId && pvc.textId == textId
    );
    // console.log(result);

    cacheData = cacheData.filter(
      (pvc) => pvc.guildId != guildId || pvc.textId != textId
    );
    // console.log({ result });
    await pvcstSchema.findOneAndRemove({ guildId, textId });
    // console.log({ result });
    return result[0];
  }),
  pvcCreate: connBoilerPlate(
    async ({ guildId, userId, textId, vcId, messageId, endTime }) => {
      // console.log(guildId)
      newEntry = await new pvcstSchema({
        guildId,
        userId,
        textId,
        vcId,
        endTime,
        timeWarn: false,
        timeUpdate: false,
        messageId,
      }).save();
      cacheData.push(newEntry);
      // console.log(newEntry)
    }
  ),
  pvcGetData: connBoilerPlate(async ({}) => {
    // console.log("test")
    cacheData = await pvcstSchema.find({});
    // console.log("Got it");
    return cacheData;
    // console.log({cacheData})
  }),
  timer: connBoilerPlate(async (client) => {
    for (let i = 0; i < cacheData.length; i++) {
      date = new Date().getTime().toString().slice(0, -3);
      date = parseInt(date);
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].endTime < date) {
          txt = await client.channels.fetch(cacheData[i].textId);
          vc = await client.channels.fetch(cacheData[i].vcId);
          // console.log({txt})
          await txt.delete();
          await vc.delete();
          await pvcstSchema.findByIdAndDelete(cacheData[i]._id);
          cacheData.splice(i, 1);
          i--;
        }
      }
    }
    // console.log("deleted");
  }),
};
