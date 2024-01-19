const router = require('express').Router();
const multer = require('multer')
const appUtil = require("../utils/appUtil")
const multerUtil = require("../utils/multerUtil")
const responseUtil = require("../utils/responseUtil")
const dbUtil = require('../utils/dbUtil');
const profileUtil = require('../utils/profileUtil');

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

// Like post
router.put('/:postID/like', async (req, res) => {
     let postID = req.params.postID
     await dbUtil.likePost( postID, req.session.userID)
     let response = await dbUtil.getPostDetails( postID )
     res.json(responseUtil.constructSuccessJson("Post Liked. Returning updated post details", response))
});

// Unlike post
router.put('/:postID/unlike', async (req, res) => {
     let postID = req.params.postID
     await dbUtil.unLikePost( postID, req.session.userID)
     let response = await dbUtil.getPostDetails( postID )
     res.json(responseUtil.constructSuccessJson("Post Unliked. Returning updated post details", response))
});

// Save post
router.put('/:postID/save', async (req, res) => {
     let currentUserID = req.session.userID
     let postID = req.params.postID
     await dbUtil.savePost( postID, currentUserID )
     let postDetails = await dbUtil.getPostDetails( postID )
     
     // TODO: 
     // TODO:(1)remove use of req.session.username, 
     // TODO:(2)implement middleware for storing userdata in authenticated calls
     // TODO:(3)change all util files to use userID
     // TODO:(4)merge dbUtil & appUtil as postUtil
     let currentUsername = await profileUtil.findUsernameByID( currentUserID ) 
     let currentUserDetails = await profileUtil.getUserDetails( currentUsername, true )

     res.json(responseUtil.constructSuccessJson("Post Saved. Returning updated post & current-user details", {postDetails, currentUserDetails}))
});

// Unsave post
router.put('/:postID/unsave', async (req, res) => {
     let currentUserID = req.session.userID
     let postID = req.params.postID
     await dbUtil.unSavePost( postID, currentUserID )
     let postDetails = await dbUtil.getPostDetails( postID )
     
     // TODO: see /save todo
     let currentUsername = await profileUtil.findUsernameByID( currentUserID ) 
     let currentUserDetails = await profileUtil.getUserDetails( currentUsername, true )

     res.json(responseUtil.constructSuccessJson("Post Unsaved. Returning updated post & current-user details", {postDetails, currentUserDetails}))
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