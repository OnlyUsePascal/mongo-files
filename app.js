require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fileRouter = require("./routers/fileRouter");
const errorHandler = require("./controllers/errorController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/files", fileRouter);
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`=> Litening on port ${PORT}`);
});

