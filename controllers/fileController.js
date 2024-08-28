const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { dbUploadFile, dbGetFileInfos, dbGetOneFile } = require("../utils/mongoFile");


const getFileInfos = async (req, res, next) => {
    // get all metadata
    const arr = await dbGetFileInfos();
    return res.status(StatusCodes.ACCEPTED).json({
        message: arr,
    });
};


const getOneFile = async (req, res, next) => {
    const fileName = req.params.filename;
    
    try {
        const fileBuffer = await dbGetOneFile(fileName);
        
        const b64 = Buffer.from(fileBuffer).toString('base64');
        const mimeType = 'image/jpg';
        const image = `<img src="data:${mimeType};base64,${b64}" />`
        
        res.send(image);
    } catch (err) {
        next(err);
    }
};


const uploadFile = async (req, res, next) => {
    const statusCode = req.file
        ? StatusCodes.ACCEPTED
        : StatusCodes.BAD_REQUEST;
    const fileInfo = req.file || "No file received!";

    await dbUploadFile(req.file);

    return res.status(statusCode).json({
        message: "File Uploaded!",
    });
};

module.exports = { getFileInfos, uploadFile, getOneFile};
