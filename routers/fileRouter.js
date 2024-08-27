const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { getFile, uploadFile } = require("../controllers/fileController");
const upload = require("../middlewares/upload");
const fileRouter = express.Router();

fileRouter.get("/:filename", getFile);

fileRouter.post(
    "/upload",
    upload.single('fileTarget'),
    async (req, res, next) => {
        const statusCode = req.file
            ? StatusCodes.ACCEPTED
            : StatusCodes.BAD_REQUEST;
        const fileInfo = req.file || "No file received!";
        
        return res.status(statusCode).json({
            message: fileInfo,
        });
    }
);

module.exports = fileRouter;
