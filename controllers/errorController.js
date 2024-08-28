const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
};

module.exports = errorHandler;
