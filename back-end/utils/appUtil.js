const { default: mongoose } = require("mongoose")
const userDB = require("../database/schemas/users")
const { v4: uuidv4 } = require('uuid');

module.exports = {
     createNewPost: async ( userID, postDetails, files )=>{
          
          let postID = uuidv4();

          let postsJSON = {
               postID,
               media:[],
               postedTime: Date.now(),
               caption: postDetails.caption,
               location: postDetails.location,
               flags:{
                    hideViews:postDetails.hideViews,
                    hideLikes:postDetails.hideLikes,
                    hideComments:postDetails.hideComments,
                    disableComments:postDetails.disableComments
               },
               likes:[],
               comments:[]
          }

          for( let i=0 ; i<files.length ; i++ ){
               postsJSON.media.push({
                    mimeType: files[i].mimetype,
                    fileName: files[i].filename,
                    originalName: files[i].originalname,
                    path: files[i].path
               })
          }

          const userIDObj = new mongoose.Types.ObjectId(userID)
          
          // >> Developer Note <<
          // the below operation can be done as findOne and
          // in the callback function, modify it and then 
          // save() the document. But this also means in 
          // a large volume case, the document could be  
          // modified in between find and update.
          // Keeping db operations as ATOMIC as possible is
          // best practice.
          // Anyways, we dont need to worry on this app :)

          await userDB.findOneAndUpdate( 
               { _id : userIDObj },
               { $push: { posts : postsJSON } },
               { new:true, useFindAndModify:false}
          )
          

          return postID;

     }
}