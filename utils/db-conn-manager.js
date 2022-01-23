const mongoose = require('mongoose');
require('dotenv').config()

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const dbConnManager  = {
    connect: () => {
        const url = `mongodb://${dbHost}:${dbPort}/${dbName}`
        return mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology:true,

        });

    },

    safeConnect: async() => {
        try{
            const mongoose =  await dbConnManager.connect();
            console.log(`Connected to database; ${dbName} at ${dbHost}:${dbPort}`);
            return mongoose
        } catch (error){

            console.log("Connection Failed. Error",error);
            console.log("Closing App");
            process.exit();
        }
    },
};

module.exports = dbConnManager;