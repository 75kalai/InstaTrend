const responseUtil = require("../utils/responseUtil")
const userDB = require('../database/schemas/users')
const router = require("express").Router()
const multer = require('multer')
const multerUtil = require("../utils/multerUtil")
const profileUtil = require("../utils/profileUtil")

router.get("/check-username-availability/:newUsername", async (req, res)=>{
     let newUsername = req.params.newUsername

     let results = await userDB.findOne(
          { username : newUsername},
          { username : 1 }
     )

     if( results == null ){
          return res.status(200).json( responseUtil.constructSuccessJson("Username is available", {
               username: newUsername,
               isUsernameAvailable:true
          }))
     }

     return res.status(200).json( responseUtil.constructSuccessJson("Username is taken.", {
               username : newUsername,
               isUsernameAvailable : false
          }
     ) )
})

router.post("/update-profile", (req, res)=>{
     let contentType = req.headers["content-type"].split(";")[0]
     if (contentType != "multipart/form-data") {
          res.status(400).json(responseUtil.constructFailureJson(
               4400,
               `Wrong request header Content-Type. Expected 'multipart/formdata'. But recieved '${contentType}'`
          ));
     }

     return multerUtil.storeMultipleMedia(
          req, res,
          "profilePhoto", // param name containing media
          "profileDetails", // param name containing post's meta info
          multerUtil.StoreLocation.PROFILE_ORIG,
          async function (newReq, err) {
               // Callback
               if (err instanceof multer.MulterError) {
                    console.error('UPLOAD ERROR :', err);
                    return res.status(500).send(responseUtil.constructFailureJson(9000, err))
               } else if (err) {
                    console.error('INTERNAL ERROR :', err);
                    return res.status(400).send(responseUtil.constructFailureJson(9000, err))
               } else {
                    // STORE SUCCESS !
                    let profilePhotoFile = req.files.profilePhoto;
                    let profileDetails = JSON.parse(req.body.profileDetails)
                    let userID = req.session.userID;
                    let dbUpdateObject = {}

                    let origUserDetails = await userDB.findOne( {_id:req.session.userID}, {username:1} )
                    let _username = origUserDetails.username
                    if( profileDetails.username && profileDetails.username!=_username ){
                         let result = await userDB.findOne( {username: profileDetails.username}, {username:1} )
                         if(result){
                              return res.status(400).json(responseUtil.constructFailureJson(4400, "username already exists"))
                         }else{
                              _username = profileDetails.username
                              dbUpdateObject.username= _username
                              // TODO : if username is changed, either
                              // 1) remove req.session.username and its usage (prefered), OR
                              // 2) destroy current session and create a new one. (Kinda messy)
                         }
                    }

                    if( profileDetails.removeProfilePic ){
                         dbUpdateObject.profilePhotoURL = null
                         dbUpdateObject.profilePhotoThumbURL = null
                    }
                    else if( profilePhotoFile ){
                         dbUpdateObject.profilePhotoURL = profilePhotoFile[0].filename
                         // TODO : also generate thumb url and set it
                         dbUpdateObject.profilePhotoThumbURL = profilePhotoFile[0].filename
                    }

                    
                    if( profileDetails.description ){
                         console.log('Desc is hit', profileDetails.description);
                         dbUpdateObject.descripition = profileDetails.description
                    }else{

                    }

                    let results = await userDB.updateOne(
                         { _id: userID },
                         {
                              $set:dbUpdateObject
                         }
                    )

                    if(results){
                         let updatedUserDetails = await profileUtil.getUserDetails( _username, true )
                         return res.status(200).json(responseUtil.constructSuccessJson("Successfully created a new post. Fetching updated user details.", updatedUserDetails))
                    }else{
                         return res.status(500).json(responseUtil.constructFailureJson(9000, "Something went wrong"))
                    }

               }
          }
     )
})

module.exports = router