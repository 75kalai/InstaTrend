const mongoose =require('mongoose')
const { Schema } = mongoose
const mediaSchema = require("./media")
const commentsSchema = require('./comments')

const postSchema = new mongoose.Schema({
     
     postID:{
          type:Schema.Types.String,
          required:true
     },
     
     // Why need an index?
     // index:{
     //      type:Schema.Types.Number,
     //      required:true,
     //      min:0
     // },
     media:[ mediaSchema ],
     postedTime:{
          type:Schema.Types.Date,
          required:true
     },
     caption:{
          type:Schema.Types.String,
          required:false
     },
     location:{
          type:Schema.Types.String,
          required:false
     },
     flags:{
          hideViews:{
               type:Schema.Types.Boolean,
               required:true,
               default:false
          },
          hideLikes:{
               type:Schema.Types.Boolean,
               required:true,
               default:false
          },
          hideComments:{
               type:Schema.Types.Boolean,
               required:true,
               default:false
          },
          disableComments:{
               type:Schema.Types.Boolean,
               required:true,
               default:false
          }
     },
     likes:[ Schema.Types.ObjectId ],
     comments:[ commentsSchema ],
})

module.exports = postSchema