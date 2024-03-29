const responseUtil = require('./responseUtil')

module.exports = {
     verifyAuth: (req, res, next) => {
          
          if( req.path.split("/")[1] == "api" ){

               if (!req.session.authenticated) {
                    console.log(':: Call is unathenticated :: ');
                    return res.status(400).send(responseUtil.constructFailureJson(1004))
               }
               console.log(':: Call is AUTHENTICATED :: username:', req.session.username);
               
          }
          
          next()
     }

}