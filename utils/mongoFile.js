const { GridFSBucket, ObjectId } = require("mongodb");
const { client } = require("../database/mongoDb");
const { Readable } = require("stream");
const { rejects } = require("assert");
const { ObjectID } = require("mongodb");

const dbUploadFile = async (file) => {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB);

        let bucket = new GridFSBucket(db, {
            bucketName: "myBucket",
        });

        const fileName = `${Date.now()}-${file.originalname}`;
        const metadata = {
            field: "my Field",
            value: "my Value",
        };
        const uploadPromise = new Promise((resolve, reject) => {
            Readable.from(file.buffer)
                .pipe(
                    bucket.openUploadStream(fileName, {
                        metadata: metadata,
                    })
                )
                .on("error", (err) => {
                    reject(err);
                })
                .on("finish", () => {
                    resolve("File Uploaded!");
                });
        });

        await uploadPromise;
    } catch (err) {
        // console.log("err", err);
        throw err;
    } finally {
        // console.log("connection close");
        await client.close();
    }
};


const dbGetFileInfos = async () => {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB);

        let bucket = new GridFSBucket(db, {
            bucketName: "myBucket",
        });

        const cursor = bucket.find({
            // _id: new ObjectId('66ceb74cdc53a212681a7543')
            // TODO: custom metadata
            "metadata.field": "my Field",
        });
        return await cursor.toArray();

        // await uploadPromise;
    } catch (err) {
        // console.log("err", err);
        throw err;
    } finally {
        // console.log("connection close");
        await client.close();
    }
};



module.exports = { dbUploadFile, dbGetFileInfos };
