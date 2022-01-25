const { find, findByIdAndDelete } = require("./schemas/pvcschema");
const pvcSchema = require("./schemas/pvcschema");
const pvcstSchema = require("./schemas/pvcstrgschema");
const { connBoilerPlate } = require("./utils/conn-util");
cacheData = [];

module.exports = {
  setup: connBoilerPlate(async ({ guildId, categId }) => {
    await pvcSchema.findOneAndUpdate(
      { guildId },
      { guildId, categId, chanId },
      { upsert: true, new: true }
    );
  }),
  findCateg: connBoilerPlate(async ({ guildId }) => {
    result = await pvcSchema.findOne({ guildId });
    return result;
  }),
  findPVC: connBoilerPlate(async ({ guildId, textId }) => {
    result = cacheData.filter(
      (pvc) => pvc.guildId == guildId && pvc.textId == textId
    );
    return result[0];
  }),
  deletePVC: connBoilerPlate(async ({ guildId, textId }) => {
    cacheData = cacheData.filter(
      (pvc) => pvc.guildId != guildId || pvc.textId != textId
    );
    await pvcstSchema.findOneAndRemove({ guildId, textId });
  }),
  pvcCreate: connBoilerPlate(
    async ({ guildId, userId, textId, vcId, messageId, endTime }) => {
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
    }
  ),
  pvcGetData: connBoilerPlate(async ({}) => {
    cacheData = await pvcstSchema.find({});
    return cacheData;
  }),
  timer: connBoilerPlate(async (client) => {
    for (let i = 0; i < cacheData.length; i++) {
      date = new Date().getTime().toString().slice(0, -3);
      date = parseInt(date);
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i].endTime < date) {
          txt = await client.channels.fetch(cacheData[i].textId);
          vc = await client.channels.fetch(cacheData[i].vcId);
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
