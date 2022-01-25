// Basic welcome message feature
const pvcSys = require("../pvcsystem");

module.exports = async (client, instance) => {
  console.log("Checking");
  await pvcSys.pvcGetData({});
  pvcSys.timer(client);
};

// Configuration for this feature
module.exports.config = {
  displayName: "PVC System",
  dbName: "PVC",
};
