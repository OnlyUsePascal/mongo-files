const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { dbUploadFile } = require("../utils/mongoFile");
// const testUpload = require("../database/mongoDb");


const getFile = async (req, res, next) => {
    const users = await User.find();
    console.log(users);
    
    return res
        .status(StatusCodes.ACCEPTED)
        .json({
            message : `file name = ${req.params.filename}`
        });
};


// const listFile = async (req, rses)


const uploadFile = async (req, res, next) => {
    const statusCode = req.file
        ? StatusCodes.ACCEPTED
        : StatusCodes.BAD_REQUEST;
    const fileInfo = req.file || "No file received!";
    
    // await testUpload(req.file.buffer);
    await dbUploadFile(req.file);
    // await uploadFile(req.file);
    return res.status(statusCode).json({
        message: fileInfo,
    });
};

module.exports = {getFile, uploadFile};