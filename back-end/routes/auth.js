const router = require('express').Router();
const sessionStore = require("../database/mongoStore");

const userDB = require('../database/schemas/users');

const responseUtil = require('../utils/responseUtil')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { verifyAuth } = require('../utils/authUtil')
const profileUtil = require("../utils/profileUtil")

// ------------- ROUTES ---------------

router.post('/register', async (req, res) => {
     let { username, password } = req.body;

     let userData = await userDB.findOne({ username })
     if (userData) {
          // User already has a registered account. 
          // 409:Conflict
          res.status(409).json(responseUtil.constructFailureJson(1001)) // somehow use ErrorsUtil
     } else {
          bcrypt.hash(password, saltRounds, async function (err, passwordHash) {

               if (err) {
                    console.error("ERROR : REGISTER USER : ", username, password, err)
                    // Internal server error
                    res.status(500).json(9000);
               }
               await userDB.create({
                    username,
                    passwordHash: passwordHash,
                    accountCreatedTime: Date.now(),
               })

               let newUser = await profileUtil.getUserDetails( username, true )
               res.json(responseUtil.constructSuccessJson("User Successfully Registered", newUser))
          });
     }
});

router.post('/login', async (req, res) => {
     let { username, password } = req.body;

     let userData = await userDB.findOne({ username }) 
     if (userData) {
          userData = userData.toJSON()
          bcrypt.compare(password, userData.passwordHash, async function (err, result) {

               if (err) {
                    console.error("ERROR : REGISTER USER : ", username, password, err)
                    // Internal server error
                    return res.status(500).json(9000);
               }

               if (result) {
                    console.log('LOGIN : PASS-BCRYPT COMPARE RESULT : ', result);
                    req.session.authenticated = true

                    // :: Storing in username should be suffice if proper validation 
                    // :: for username is done. userID( gen by DB shouldnt be necessary)
                    req.session.userID = userData._id.toString()
                    req.session.username = username;
                    
                    let userDetail = await profileUtil.getUserDetails( username, true );
                    return res.status(200).json(responseUtil.constructSuccessJson("Log-in Success", userDetail));
               } else {
                    // Password is incorrect
                    // 401:User Unautherised
                    return res.status(401).json(responseUtil.constructFailureJson(1003))
               }

          });
     } else {
          //User is not registered. 
          // 404: User Not Found
          res.status(404).json(responseUtil.constructFailureJson(1002))
     }
});

router.post('/logout', verifyAuth, (req, res) => {
     sessionID = req.sessionID
     req.session.destroy()
     res.clearCookie('connect.sid')
     res.status(200).json(responseUtil.constructSuccessJson("User logged out Sucessfully"))
});

router.get('/me', verifyAuth, async (req, res) => {
     sessionID = req.sessionID

     let userDetail = await profileUtil.getUserDetails( req.session.username, true );

     if( userDetail ){
          res.json(responseUtil.constructSuccessJson(
               `User is logged in. Hello ${userDetail.username}.`, 
               userDetail
          ))
     }else{
          // auth exists, but record not exists?
          res.status(404).json( responseUtil.constructFailureJson(
               `User details not found`
          ) )
     }

});

module.exports = router

