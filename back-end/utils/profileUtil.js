const userDB = require('../database/schemas/users')
const { default: mongoose } = require("mongoose")

module.exports = {
     getUserDetails: async (username, getPrivateDetails=false) => {

          // getPrivateDetails=false

          // let projection = 
          // if( getPrivateDetails ){
          //      projection.savedPosts = 1
          // }

          let userDetail = await userDB.findOne(
               { username },
               {
                    _id: 1,
                    username: 1,
                    accountCreatedTime: 1,
                    profilePhotoURL: 1,
                    profilePhotoThumbURL: 1,
                    description: 1,
                    posts: 1,
                    following: 1,
                    followers: 1,
                    savedPosts: 1
               }
          )
          if( userDetail == null ){
               return false;
          }

          let parsedUserDetails = userDetail.toJSON()

          let followersUsernames = await userDB.find(
               { 
                    _id: {
                         $in : userDetail.followers
                    }
               },
               { username : 1 }
          )
          let followingUsernames = await userDB.find(
               { 
                    _id: {
                         $in : userDetail.following
                    }
               },
               { username : 1 }
          )
          
          parsedUserDetails.followers = followersUsernames.map( (obj)=>obj.username )
          parsedUserDetails.following = followingUsernames.map( (obj)=>obj.username )

          console.log('savedPOSTS', userDetail.savedPosts);

          if( getPrivateDetails ){
               parsedUserDetails.savedPosts = userDetail.savedPosts
          }
          
          return parsedUserDetails;
     },
     findUserIDByUsername: async ( username ) => {
          let id = await userDB.findOne(
               { username },
               { _id:1 }
          )
          return id?._id.toString()
     },
     findUsernameByID: async ( _idStr )=>{
          return (await userDB.findOne(
               { _id: new mongoose.Types.ObjectId(_idStr) },
               { username:1 }
          )).username
     },
     followUser: async function (_idOfCurrentUser, userToFollow){
          _idOfUserToFollow = await this.findUserIDByUsername( userToFollow );
          
          if( !_idOfCurrentUser || !_idOfUserToFollow ){
               return false;
          }

          // adding "userToFollow" to "currentUsers" "following" list
          await userDB.findOneAndUpdate(
               { _id: _idOfCurrentUser },
               // { username: currentUser },
               {
                    $push: {
                         following: _idOfUserToFollow
                    }
               }
          )

          // adding "currentUser" to "userToFollow" 's "followers" list
          return await userDB.findOneAndUpdate(
               { _id: _idOfUserToFollow },
               // { username: userToFollow },
               {
                    $push: {
                         followers: _idOfCurrentUser
                    }
               },
               { new: true }
          )
     },
     unFollowUser: async function (_idOfCurrentUser, userToUnFollow){
          _idOfUserToUnFollow = await this.findUserIDByUsername( userToUnFollow );
          
          // adding "userToFollow" to "currentUsers" "following" list
          await userDB.findOneAndUpdate(
               { _id: _idOfCurrentUser },
               // { username: currentUser },
               {
                    $pull: {
                         following: _idOfUserToUnFollow
                    }
               }
          )

          // adding "currentUser" to "userToFollow" 's "followers" list
          return await userDB.findOneAndUpdate(
               { _id: _idOfUserToUnFollow },
               // { username: userToFollow },
               {
                    $pull: {
                         followers: _idOfCurrentUser
                    }
               },
               { new : true }
          )
     },
}