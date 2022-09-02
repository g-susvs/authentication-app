const path = require("path");
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validatedExtensions = ["png", "jpg", "jpeg", "gif"], carpeta = "") => {
    
    return new Promise((resolve, reject) => {
        
        const { file } = files;
        const cutName = file.name.split(".");
        const extension = cutName[cutName.length - 1];

        if (!validatedExtensions.includes(extension)) {
            return reject(`Archivo con extensión ${extension} no es valido - ${validatedExtensions}`);
        }

        const temporaryName = `${uuidv4()}.${extension}`;

        const uploadPath = path.join(__dirname, "../uploads/", carpeta, temporaryName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
                resolve(temporaryName)
        });
    })



}

module.exports = {uploadFile}