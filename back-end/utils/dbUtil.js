const mongoose = require("../database")
const userDB = require('../database/schemas/users');

module.export = {
     getUserDetails: async  (_idStr) => {
          const userIDObj = new mongoose.Types.ObjectId(req.session.userID)
          let userDetail = await userDB.findOne({ _id: userIDObj }, { passwordHash: 0 })
          if (userDetail) {
               return userDetail
          } else {
               // User Logged in, but no record on DB?
               console.error("User Logged in, but no record on DB. UserID (_id) : ", _idStr)
               throw new Error("User Logged in, but no record on DB. UserID (_id) : ", _idStr)
          }
     },
     getPostDetails: async ( postID )=>{
          let postDetails = await userDB.findOne(
               {
                    photos:{
                         $elemMatch:{
                              postID
                         }
                    }
               }
          )
          return postDetails
     }
}