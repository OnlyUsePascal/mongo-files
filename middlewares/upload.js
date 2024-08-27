const multer = require("multer");

const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        return cb(null, fileName);
    },
});

const imgFilter = (req, file, cb) => {
    console.log(file.originalname);
    console.log(file.originalname.match("/\.(jpg|jpeg|png)$/"));
    if (!file.originalname.match("/\.(jpg|jpeg|png)$/"))
        return cb(
            new Error(
                "File must be of type JPG, JPEG, or PNG and nore more than 2MB in size"
            ),
            false
        );

    if (!file.originalname.startsWith(`image`))
        return cb(new Error("Please upload only images.", false));

    return cb(null, true);
};

const upload = multer({
    storage: imgStorage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(
                new Error(
                    "File must be of type JPG, JPEG, or PNG and nore more than 2MB in size"
                ),
                false
            );
    
        if (!file.mimetype.startsWith(`image`))
            return cb(new Error("Please upload only images.", false));
    
        return cb(null, true);
    },
});

module.exports = upload;