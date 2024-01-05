const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

function storeMultipleMedia(req, res, paramName1, paramName2, destination, callback) {

     const storage = multer.diskStorage({
          destination,
          filename: (req, file, cb) => {
               let name = uuidv4() + "" + path.extname(file.originalname);
               return cb(null, name);
          }
     })

     const multi_upload = multer({
          storage: storage,
          limits: {
               fileSize: 10 * 1024 * 1024 //10MB
          },
          fileFilter: (req, file, cb) => {
               switch (file.mimetype) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                    case 'video/mp4':
                         cb(null, true);
                         break;
                    default:
                         cb(null, false);
                         const err = new Error('Only .png, .jpg, .jpeg and .mp4 formats allowed!')
                         err.name = 'ExtensionError'
                         console.log('fileFilter:failure');

                         cb(err);
               }
          }
     })

     multi_upload.fields([
          {name: paramName1},
          {name: paramName2}
     ])(req, res, callback)
}

const StoreLocation = {
     POSTS: "./storage/posts",
     PROFILE_ORIG: "./storage/profile/original",
     PROFILE_THUMB: "./storage/profile/thumb"
}

module.exports = {
     storeMultipleMedia,
     StoreLocation
}