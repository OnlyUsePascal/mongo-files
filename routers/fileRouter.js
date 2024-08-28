const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { uploadFile, getFileInfos, getOneFile } = require("../controllers/fileController");
const fileHandler = require("../middlewares/multer");
const { dbGetOneFile } = require("../utils/mongoFile");
const fileRouter = express.Router();


fileRouter.get("/", getFileInfos);

fileRouter.get("/:filename", getOneFile);

fileRouter.post("/upload", fileHandler.single("fileTarget"), uploadFile);
module.exports = fileRouter;
