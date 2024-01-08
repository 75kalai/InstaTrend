const mongoose = require("../database")
const userDB = require('../database/schemas/users');

module.exports = {
     getUserDetails: async (_idStr) => {
          let userDetail = await userDB.findOne({ _id: _idStr }, { passwordHash: 0 })
          if (userDetail) {
               return userDetail
          } else {
               // User Logged in, but no record on DB?
               console.error("User Logged in, but no record on DB. UserID (_id) : ", _idStr)
               throw new Error("User Logged in, but no record on DB. UserID (_id) : ", _idStr)
          }
     },
     getPostDetails: async ( postID )=>{
          console.log('postID ', postID);

          // postDetails in IMMUTABLE. WHY!???!?!?
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
          let response = {
               profile:{
                    username:postDetails.username,
                    profilePhotoURL:postDetails.profilePhotoURL,
                    profilePhotoThumbURL:postDetails.profilePhotoThumbURL,
               },
               content:postDetails.posts[0]
          }
          return response
          
     }
}