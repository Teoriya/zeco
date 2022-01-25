const { model, Schema } = require("mongoose");
const { reqString, reqNumber } = require("../utils/datatypes");

const pvcSchema = Schema({
  guildId: reqString,
  categId: reqString,
  chanId: reqString,
});

module.exports = model("pvcSchema", pvcSchema);
