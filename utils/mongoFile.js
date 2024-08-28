const { GridFSBucket } = require("mongodb");
const { client } = require("../database/mongoDb");
const { Readable } = require("stream");
const { rejects } = require("assert");

async function dbUploadFile(file) {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB);

        let bucket = new GridFSBucket(db, {
            bucketName: "myBucket",
        });

        const fileName = `${Date.now()}-${file.originalname}`;

        const uploadPromise = new Promise((resolve, rejects) => {
            // const writeStream = );
            Readable.from(file.buffer)
                .pipe(bucket.openUploadStream(fileName, {
                    metadata: { field: "myField", value: "myValue" },
                }))
                .on("error", (err) => {
                    rejects(err);
                })
                .on("finish", () => {
                    resolve('File Uploaded!');
                });
        });

        await uploadPromise;
    } catch (err) {
        console.log("err", err);
        throw err;
    } finally {
        console.log("connection close");
        await client.close();
    }
}

module.exports = { dbUploadFile };
