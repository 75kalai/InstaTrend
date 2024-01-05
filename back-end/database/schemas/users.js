const mongoose =require('mongoose')
const { Schema } = mongoose
const postSchema = require('./post')
const notificationsSchema = require('./notifications')

const userSchema = new mongoose.Schema({
     // userId:{
     //      type:Schema.Types.ObjectId,
     //      required:true
     // },
     username:{
          type:Schema.Types.String,
          required:true
     },
     passwordHash:{
          type:Schema.Types.String,
          required:true
     },
     accountCreatedTime:{
          type:Schema.Types.Date,
          required:true,
          default:Date.now()
     },
     profilePhotoURL:{
          type:Schema.Types.String
     },
     profilePhotoThumbURL:{
          type:Schema.Types.String
     },
     description:{
          type:Schema.Types.String
     },

     posts:[ postSchema ],
     savedPosts:[ Schema.Types.ObjectId ],
     followers:[ Schema.Types.ObjectId ],
     following:[ Schema.Types.ObjectId ],
     notifications:[ notificationsSchema ],

})


module.exports = mongoose.model('user', userSchema)