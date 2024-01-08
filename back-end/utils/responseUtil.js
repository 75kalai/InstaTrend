const ErrorCode = require('./errorsUtil')

module.exports = {
     constructSuccessJson:(message=null, data=null)=>{
          let response = {
               status:"success",
               code:0,
          }
          if(message){
               // Override with custom message?
               response.message = message
          }
          if(data){
               response.data=data
          }
          return response
     },
     constructFailureJson:(errCode, message=null, errorData=null)=>{
          let response = {
               message:ErrorCode[errCode],
               code:errCode,
               status:"failure"
          }
          if(message){
               // Override with custom message?
               response.message = message
          }
          if(errorData){
               response.error=errorData
          }
          return response
     }
}