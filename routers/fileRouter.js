const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { getFile, uploadFile } = require("../controllers/fileController");
const upload = require("../middlewares/upload");
const fileRouter = express.Router();

fileRouter.get("/:filename", getFile);

fileRouter.post(
    "/upload",
    upload.single('fileTarget'),
    uploadFile
);

module.exports = fileRouter;
