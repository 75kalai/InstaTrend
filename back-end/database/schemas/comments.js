
const mongoose =require('mongoose')
const { Schema } = mongoose

const commentsSchema = new mongoose.Schema({
     commentor_userId:{
          type:Schema.Types.ObjectId,
          required:true
     },
     comment:{
          type:Schema.Types.String,
          required:true
     },
     likedBy: [ Schema.Types.ObjectId ]
})

module.exports = commentsSchema