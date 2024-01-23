const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

const multerS3 = require("multer-s3");
// const { S3Client } = require("@aws-sdk/client-s3");
const { S3 } = require("aws-sdk")

function storeMultipleMedia(req, res, paramName1, paramName2, destination, callback) {

     function genFileName(file){
          return uuidv4() + "" + path.extname(file.originalname);
     }

     // LOCAL STORAGE 
     const localStorage = multer.diskStorage({
          destination,
          filename: (req, file, cb) => {
               let name = genFileName(file)
               return cb(null, name);
          }
     })

     // S3 STORAGE
     const credentials = {
          credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
          },
          region: process.env.AWS_REGION
      }
     const s3 = new S3()
     const s3Storage = multerS3({
          s3: s3, // s3 instance
          bucket: process.env.S3_BUCKET_NAME, 
          acl: "public-read", // storage access type
          contentType: multerS3.AUTO_CONTENT_TYPE,
          metadata: (req, file, cb) => {
              cb(null, {fieldname: file.fieldname})
          },
          key: (req, file, cb) => {
              const fileName = genFileName(file);
              cb(null, fileName);
          }
      });

     console.log('multer storage is s3? ', process.env.MULTER_STORAGE_PROVIDER=="S3");
     const multi_upload = multer({
          storage: process.env.MULTER_STORAGE_PROVIDER=="S3"? s3Storage : localStorage,
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
                         console.log('file is a valid mimetype', file.mimetype);
                         break;
                    default:
                         const errString = 'Only .png, .jpg, .jpeg and .mp4 formats allowed!'
                         const err = new Error( errString )
                         err.name = 'ExtensionError'
                         console.log('fileFilter: file format is no allowed ');
                         req.fileValidationError = errString
                         cb(null, false, err);
               }
          },
          onFileUploadData: function (file, data, req, res) {
               console.log('file', file);
               console.log('data', data);
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