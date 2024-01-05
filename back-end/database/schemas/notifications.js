const mongoose =require('mongoose')
const { Schema } = mongoose

const notificationsSchema = new mongoose.Schema({
     notificationID:{
          type:Schema.Types.ObjectId,
          required:true
     },
     content:{
          type:Schema.Types.String,
          required:true
     },
     notificationThumbURL:{
          type:Schema.Types.String,
          required:true
     },
     createdTime:{
          type:Schema.Types.Date,
          required:true
     },
     linkToAction:{
          type:Schema.Types.String,
          required:false
     }
})

module.exports = notificationsSchema