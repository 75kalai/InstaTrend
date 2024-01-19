const router = require("express").Router();
const profileUtil = require("../utils/profileUtil");
const responseUtil = require("../utils/responseUtil");
const path = require("path")

router.get('/:username', async (req, res, next)=>{
     let currentUser = req.session.username
     let requestedUsername = req.params.username

     let userDetails = await profileUtil.getUserDetails( requestedUsername, (currentUser==requestedUsername) )
     return res.json(responseUtil.constructSuccessJson("User Profile details retrieved", userDetails) )
})

router.put("/:userToFollow/follow", async (req, res, next)=>{
     let currentUser = req.session.username
     let currentUserID = req.session.userID
     let userToFollow = req.params.userToFollow
     
     if( currentUser == userToFollow ){
          return res.json( responseUtil.constructFailureJson(4404,"Cannot follow the same user") )
     }
     
     let result = await profileUtil.followUser( currentUserID, userToFollow )
     if( !result ){
          return res.json( responseUtil.constructFailureJson("Something went wrong") )
     }

     let userDetails = await profileUtil.getUserDetails( userToFollow, (currentUser==userToFollow) )

     return res.json( responseUtil.constructSuccessJson(
          `'${currentUser}' is now following '${userToFollow}'. Updated details of '${userToFollow}' is fetched.`,
          userDetails
     ) )
})

router.put("/:userToUnFollow/unfollow", async (req, res, next)=>{
     let currentUser = req.session.username
     let currentUserID = req.session.userID
     let userToUnFollow = req.params.userToUnFollow

     if( currentUser == userToUnFollow ){
          return res.json( responseUtil.constructFailureJson(4404,"Cannot unfollow the same user") )
     }
     
     let result = await profileUtil.unFollowUser( currentUserID, userToUnFollow )
     if( !result ){
          return res.json( responseUtil.constructFailureJson("Something went wrong") )
     }

     let userDetails = await profileUtil.getUserDetails( userToUnFollow, (currentUser==userToUnFollow) )

     return res.json( responseUtil.constructSuccessJson(
          `'${currentUser}' is not following '${userToUnFollow}' anymore`,
          userDetails
     ) )
})

router.get("/dp/:profilePicName", (req, res)=>{
     let profilePicName = req.params.profilePicName
     return res.sendFile( profilePicName , {
          root: path.join(__dirname, "../storage/profile/original/"),
          dotfiles: "deny",
          function(err) {
               if (err) {
                    next(err)
               } else {
                    console.log('Sent:', fileName)
               }
          }
     }) 
})


router.get("/dpThumb/:profilePicName", (req, res)=>{
     // TODO : return real thumb file. must be generated already
     let profilePicName = req.params.profilePicName
     return res.sendFile( profilePicName , {
          root: path.join(__dirname, "../storage/profile/original/"),
          dotfiles: "deny",
          function(err) {
               if (err) {
                    next(err)
               } else {
                    console.log('Sent:', fileName)
               }
          }
     }) 
})

module.exports = router;