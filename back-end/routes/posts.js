const router = require('express').Router();
const multer = require('multer')
const appUtil = require("../utils/appUtil")
const multerUtil = require("../utils/multerUtil")
const responseUtil = require("../utils/responseUtil")
const dbUtil = require('../utils/dbUtil')

// Create new post
router.post('/', (req, res) => {

     let contentType = req.headers["content-type"].split(";")[0]
     if (contentType != "multipart/form-data") {
          res.status(400).json(responseUtil.constructFailureJson(
               4400,
               `Wrong request header Content-Type. Expected 'multipart/formdata'. But recieved '${contentType}'`
          ));
     }

     return multerUtil.storeMultipleMedia(
          req, res,
          "media", // param name containing media
          "post-details", // param name containing post's meta info
          multerUtil.StoreLocation.POSTS,
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
                    let files = req.files.media;
                    if (files == undefined && req.fileValidationError) {
                         console.log('FILE VALIDATION ERROR', req.fileValidationError);
                         return res.status(400).json(responseUtil.constructFailureJson(4400, null, {message:req.fileValidationError}))
                    }
                    let postDetails = JSON.parse(req.body["post-details"])
                    let userID = req.session.userID;

                    let postID = await appUtil.createNewPost(userID, postDetails, files)

                    return res.status(200).json(responseUtil.constructSuccessJson("Successfully created a new post", { postID }))
               }
          }
     )
});

// Retrieve post
router.get('/:postID', async (req, res) => {
     const { postID } = req.params
     const postDetails = await dbUtil.getPostDetails(postID)
     if( postDetails ){
          return res.json(responseUtil.constructSuccessJson("Post details retrieved", postDetails))
     }else{
          return res.status(404).json(responseUtil.constructFailureJson(4404, null, {message:"No post found matching the post-id"}) )
     }
});

// Edit post
router.put('/:postID', (req, res) => {
});

// Delete post
router.delete('/:postID', (req, res) => {

});

router.post('/:postID/like', (req, res) => {
     // Like post
});

router.post('/:postID/unlike', (req, res) => {
     // Unlike post
});

router.get('/:postID/comments', (req, res) => {
     // Get comments for the post
});

router.post('/:postID/comments', (req, res) => {
     // Add comment on a post
});

router.post('/:postID/comments/:commentId/like', (req, res) => {
     // Like a comment on a post
});

router.post('/:postID/comments/:commentId/unlike', (req, res) => {
     // Unlike a comment on a post
});

router.post('/:postID/comments/:commentId/delete', (req, res) => {
     // Delete comment on a post
});


module.exports = router