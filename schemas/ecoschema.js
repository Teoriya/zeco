const { model, Schema } = require('mongoose');
const {reqString, reqNumber} = require('../utils/datatypes');

const profileSchema = Schema({
  guildId: reqString,
  userId: reqString,
  coins: reqNumber,
});

module.exports = model('profiles', profileSchema);