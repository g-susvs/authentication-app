const path = require("path");
const fs = require("fs");

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const {uploadFile} = require("../helpers");
const User = require("../models/user");
const { response } = require("express");


const loadImage = async (req, res)=>{

  try {
    const fullPath = await uploadFile(req.files, undefined, "images/");
    
    res.status(200).json({
      path: fullPath
    });
  } catch (error) {
    res.status(400).json({
      msg:error
    });
  }
}

const updateImage = async (req, res) => {
  
  const {id, collection} = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model){
        return res.status(404).json({
          msg: `No se encontro el modelo de la colección ${collection}`
        })
      }
      
      break;
  
    default:
      res.status(500).json({msg:"No disponible"});
      break;
  }

    if(model.img){
      const pathImg = path.join( __dirname, "../uploads", collection, model.img );
      if(fs.existsSync(pathImg)){ // buscar imagen por path
        fs.unlinkSync(pathImg); // borar imagen por path
      }
    }

    const img = await uploadFile(req.files, undefined, collection);
    model.img = img;

    await model.save()
    
    res.status(200).json({
      path: model
    });
}

const updateImageCloudinary = async (req, res) => {
  
  const {id, collection} = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model){
        return res.status(404).json({
          msg: `No se encontro el modelo de la colección ${collection}`
        })
      }
      
      break;
  
    default:
      res.status(500).json({msg:"No disponible"});
      break;
  }
  // Limpiar imagen previa
  if(model.img){
    const nameArr     = model.img.split("/");
    const name        = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath} = req.files.file;
  const resp = await cloudinary.uploader.upload(tempFilePath);
  model.img = resp.secure_url;

  await model.save()
  
  res.status(200).json(model);
}

const showImage = async (req, res = response) => {
  const {id, collection} = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model){
        return res.status(404).json({
          msg: `No se encontro el modelo de la colección ${collection}`
        })
      }
      
      break;
  
    default:
      res.status(500).json({msg:"No disponible"});
      break;
  }

    if(model.img){
      const pathImg = path.join( __dirname, "../uploads", collection, model.img );
      if(fs.existsSync(pathImg)){ // buscar imagen por path
        return res.sendFile(pathImg);
      }
    }

    const noFoundImg = path.join(__dirname, "../assets/no-image.jpg");
    
    res.sendFile(noFoundImg);
}

module.exports = {
    loadImage,
    updateImage,
    showImage,
    updateImageCloudinary
}
