const responseUtil = require('./responseUtil')

module.exports = {
     verifyAuth: (req, res, next) => {
          if (!req.session.authenticated) {
               console.log('--------------- UNAUTHENTICATED CALL! --------------- ');
               return res.status(400).send(responseUtil.constructFailureJson(1004))
          }
          console.log('--------------- Authenticated CALL --------------------');
          next()
     }

}