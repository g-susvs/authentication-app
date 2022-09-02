const generateJWT = require("./generate_jwt");
const googleVerify = require("./google_verify");
const uploadFile = require("./upload-file");

module.exports = {
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}