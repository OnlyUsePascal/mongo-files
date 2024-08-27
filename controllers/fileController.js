const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");


const getFile = async (req, res, next) => {
    const users = await User.find();
    console.log(users);
    
    return res
        .status(StatusCodes.ACCEPTED)
        .json({
            message : `file name = ${req.params.filename}`
        });
};


const uploadFile = async (req, res, next) => {
    // upload status here
    
    return res
        .status(StatusCodes.ACCEPTED)
        .json({
            
            message : `File received !!!`
        });
};

module.exports = {getFile, uploadFile};