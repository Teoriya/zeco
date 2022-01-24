const mongoose = require('mongoose');
require('dotenv').config()
url = process.env.DBURL

const dbConnManager  = {
    connect: () => {
        return mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology:true,

        });

    },

    safeConnect: async() => {
        try{
            const mongoose =  await dbConnManager.connect();
            // console.log(`Connected to database; ${dbName} at ${dbHost}:${dbPort}`);
            return mongoose
        } catch (error){

            console.log("Connection Failed. Error",error);
            console.log("Closing App");
            process.exit();
        }
    },
};

module.exports = dbConnManager;