const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { getFiles, uploadFile } = require("../controllers/fileController");
const fileHandler = require("../middlewares/multer");
const { dbGetFileInfos } = require("../utils/mongoFile");
const fileRouter = express.Router();

fileRouter.get("/:filename", async (req, res, next) => {});

fileRouter.get("/", async (req, res, next) => {
    // get all metadata
    const arr = await dbGetFileInfos();
    return res.status(400).json({
        message: arr,
    });
});

fileRouter.post("/upload", fileHandler.single("fileTarget"), uploadFile);

module.exports = fileRouter;
