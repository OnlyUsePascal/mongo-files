const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { getFile, uploadFile } = require("../controllers/fileController");
const fileHandler = require("../middlewares/multer");
const fileRouter = express.Router();

fileRouter.get("/:filename", async(req, res, next) => {
        
});

fileRouter.post(
    "/upload",
    fileHandler.single('fileTarget'),
    uploadFile    
);

module.exports = fileRouter;
