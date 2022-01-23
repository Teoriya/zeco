const { model, Schema } = require('mongoose');
const {reqString, reqNumber, reqBool} = require('../utils/datatypes');

const pvcstSchema = Schema({
  guildId: reqString,
  userId: reqString,
  textId: reqString,
  vcId:reqString,
  endTime:reqString,
  messageId:reqString,
  timeWarn:reqBool,
  timeUpdate:reqBool
});

module.exports = model('pvcstSchema', pvcstSchema);