const responseUtil = require('../utils/responseUtil');
const userDB = require('../database/schemas/users');

const router = require('express').Router()

router.get("/", async (req, res) => {
     let userData = await userDB.findOne({_id:req.session.userID}, {passwordHash:0})

     // TODO: implement TIMESTAMP & LIMIT
     // let queryParams = req.query;
     // let timestamp = Number(queryParams.timestamp)
     // let limit = Number(queryParams.limit) || 10
     
     // console.log('TIME: ', timestamp);
     // let date = new Date(timestamp).toISOString()
     // console.log('TIME: ', timestamp, date);

     let posts = await userDB.aggregate([
          {
               $unwind: '$posts' // Deconstruct the posts array
          },
          {
               $match:{
                    _id:{
                         $in:userData.following
                    }
               }
          },
          {
               $sort: {
                    'posts.postedTime': -1 // Sort in descending order of createdTime
               }
          },
          // {
          //      $limit: limit 
          // },
          {
               $project:{
                    username:1,
                    posts:1,
                    profilePhotoURL:1,
                    profilePhotoThumbURL:1,
                    posts:1
               }
          }
     ])

     // TODO: change this manual structuring to db's $project based.
     let parsedPosts = posts.map((postDetails)=>{
          return {
               profile:{
                    username:postDetails.username,
                    profilePhotoURL:postDetails.profilePhotoURL,
                    profilePhotoThumbURL:postDetails.profilePhotoThumbURL,
               },
               content:postDetails.posts
          }
     });

     res.status(200).json(responseUtil.constructSuccessJson("Feeds retrieved", parsedPosts))
})

module.exports = router