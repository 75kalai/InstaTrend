const mongoose =require('mongoose')
const { Schema } = mongoose

const mediaSchema = new mongoose.Schema({
     mimeType:{
          type:Schema.Types.String,
          required:true,
          enum:['image/jpg', 'image/jpeg', 'image/png', 'video/mp4']
     },
     fileName:{
          type:Schema.Types.String,
          required:true,
     },
     originalName:{
          type:Schema.Types.String,
          required:true
     },
     path:{
          type:Schema.Types.String,
          required:true
     },
     // mediaThumbURL:{
     //      type:Schema.Types.String,
     //      required:true
     // },
     // mediaURL:{
     //      // EXPOSED FILE PATH
     //      type:Schema.Types.String,
     //      required:true
     // }
})

module.exports = mediaSchema