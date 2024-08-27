// const {MongoClient, ServerApiVersion} = require('mongodb');
const mongoose = require("mongoose");

const connectionUri = process.env.MONGO_URI;
const database = process.env.MONGO_DB;
const connectionParams = {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // serverApi: {
    //     version: ServerApiVersion.v1,
    //     strict: true,
    //     deprecationErrors: true,
    // }
};

const mongoCon = () => {
    console.log("Mongo starting...");
    mongoose
        .connect(connectionUri + database, connectionParams)
        .then(() => {
            console.log("Mongo connected ^_^");
        })
        .catch(console.dir);
};

module.exports = mongoCon;
