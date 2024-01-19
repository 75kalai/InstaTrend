const mongoose = require("../database")
const userDB = require('../database/schemas/users');

module.exports = {
     getPostDetails: async ( postID )=>{

          // postDetails in IMMUTABLE. WHY!???!?!? Query object?
          let postDetails = await userDB.findOne(
               {    
                    posts:{
                         $elemMatch:{
                              postID
                         }
                    }
               },
               {    
                    posts:{
                         $elemMatch:{
                              postID
                         }
                    },
                    username:1,
                    profilePhotoURL:1,
                    profilePhotoThumbURL:1,

               }
          )
          if( postDetails==null ){
               return null
          }

          // TODO: change this manual structuring to db's $project based.
          let response = {
               profile:{
                    username:postDetails.username,
                    profilePhotoURL:postDetails.profilePhotoURL,
                    profilePhotoThumbURL:postDetails.profilePhotoThumbURL,
               },
               content:(postDetails.posts[0]).toJSON()
          }

          let userBasicDetails = await userDB.find(
               { _id:{
                    $in:response.content.likes
               } },
               {
                    username : 1,
                    profilePhotoURL : 1,
                    profilePhotoThumbURL : 1
               }
          )
          response.content.likes = userBasicDetails;

          return response;
          
     },
     likePost: async (postID, currentUserID)=>{
          let response = await userDB.updateOne(
               {
                    posts:{
                         $elemMatch:{ postID }
                    }
               },
               {
                    $addToSet :{
                         "posts.$.likes":currentUserID
                    }
               }
          )
          return response
     },
     unLikePost: async (postID, currentUserID)=>{
          let response = await userDB.updateOne(
               {
                    posts:{
                         $elemMatch:{ postID }
                    }
               },
               {
                    $pull :{
                         "posts.$.likes":currentUserID
                    }
               }
          )
          console.log('-----------------------------------');
          console.log('>>', response);
          console.log('-----------------------------------');
          return response
     },
     savePost: async (postID, currentUserID)=>{
          return await userDB.findOneAndUpdate(
               { _id: currentUserID},
               {
                    $addToSet:{
                         savedPosts: postID
                    }
               }
          )
     },
     unSavePost: async (postID, currentUserID)=>{
          return await userDB.findOneAndUpdate(
               {_id:currentUserID},
               {
                    $pull:{
                         savedPosts:postID
                    }
               }
          )
     }
}