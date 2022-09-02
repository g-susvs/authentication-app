const {Router} = require("express");
const { check } = require("express-validator");
const { updateImage, loadImage, showImage, updateImageCloudinary } = require("../controllers/upload");
const { isValidCollection, validFormDataFile } = require("../middlewares/db_validators");
const { validateFields } = require("../middlewares/validate_fields");

const router = Router();

router.post("/",  validFormDataFile, loadImage);

// router.put("/:collection/:id",[
//     validFormDataFile,
//     check("id","No es mongo ID").isMongoId(),
//     check("collection").custom(isValidCollection),
//     validateFields
// ],updateImage);

router.put("/:collection/:id",[
    validFormDataFile,
    check("id","No es mongo ID").isMongoId(),
    check("collection").custom(isValidCollection),
    validateFields
],updateImageCloudinary);

router.get("/:collection/:id",[
    check("id","No es mongo ID").isMongoId(),
    check("collection").custom(isValidCollection),
    validateFields
], showImage);


module.exports = router;    