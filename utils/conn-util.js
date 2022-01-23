const mongo = require('./db-conn-manager');

module.exports = {
    connBoilerPlate: (wrapped) => async (obj) => {
        console.log("trying safeconnect")

        const mongoose = await mongo.safeConnect();
        try {
            // console.log({mongoose})
            return await wrapped(obj);
        }
        catch(e){console.log(e)}
        finally {
            mongoose.connection.close();
        }
    }
}