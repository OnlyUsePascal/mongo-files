const { MongoClient, GridFSBucket } = require("mongodb");

// Connection URL
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

module.exports = {client};
