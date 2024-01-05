//serve media through 
require("../database")
const router = require('express').Router()
const multer = require('multer')
const responseUtil = require("../utils/responseUtil")
const appUtil = require("../utils/appUtil")
const multerUtil = require("../utils/multerUtil")
const dbUtil = require('../utils/dbUtil')

router.post("/createPost", (req, res, next) => {
     let contentType = req.headers["content-type"].split(";")[0]
     if(contentType != "multipart/form-data" ){
          res.status(400).json( responseUtil.constructFailureJson(
               4400, 
               `Wrong request header Content-Type. Expected 'multipart/formdata'. But recieved '${contentType}'`
          ) );
     }

     multerUtil.storeMultipleMedia( 
          req, res, 
          "media", // param name containing media
          "post-details", // param name containing post's meta info
          multerUtil.StoreLocation.POSTS,
          async function ( newReq, err ){ 
               // Callback
               if (err instanceof multer.MulterError) {
                    console.error('UPLOAD ERROR :', err);
                    return res.status(500).send( responseUtil.constructFailureJson(9000, err))
               } else if (err) {
                    console.error('INTERNAL ERROR :', err);
                    return res.status(400).send( responseUtil.constructFailureJson(9000, err))
               } else {
                    // STORE SUCCESS !
                    let files = req.files.media;
                    let postDetails = JSON.parse(req.body["post-details"])
                    let userID = req.session.userID;

                    let postID = await appUtil.createNewPost( userID, postDetails, files )

                    return res.send( responseUtil.constructSuccessJson( "Successfully created a new post", postID ) ) 
               }
          } 
     )

} )

router.post("/updatePost", (req, res)=>{

})

router.get("/getPost/:postID", async (req, res, next)=>{
     const { postId } = req.params
     return res.send( await dbUtil.getUserDetails(req.session.userID) )
})

module.exports = router