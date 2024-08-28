const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { dbUploadFile } = require("../utils/mongoFile");
// const testUpload = require("../database/mongoDb");


const getFiles = async (req, res, next) => {
    return res
        .status(StatusCodes.ACCEPTED)
        .json({
            message : `gg well played`
        });
};

const uploadFile = async (req, res, next) => {
    const statusCode = req.file
        ? StatusCodes.ACCEPTED
        : StatusCodes.BAD_REQUEST;
    const fileInfo = req.file || "No file received!";
    
    await dbUploadFile(req.file);

    return res.status(statusCode).json({
        message: 'File Uploaded!',
    });
};

module.exports = {getFiles, uploadFile};