
const ErrorCode={
     // code:status
     0:"Success",
     
     1000:"AUTH ERRORS",
     1001:"User already registered",
     1002:"User is not registered",
     1003:"Password is incorrect",
     1004:"User is not logged in",
     1005:"User not found",

     4400:"Bad Request",
     4404:"Resource not found",
     
     9000:"Interal server error",
     9001:"Fatal server error",
     9002:"Failed to create a session",
     9003:"Failed to destroy a session",
     9004:"Failed to get a session",


}

module.exports=ErrorCode