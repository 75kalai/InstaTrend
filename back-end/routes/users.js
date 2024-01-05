const router = require('express').Router();

router.get('/users/:userID',(req, res)=>{
     // Get User Detail
});


router.post('/user/:userID/follow',(req, res)=>{
     // Follow User
});


router.post('/users/:userID/unfollow',(req, res)=>{
     // Unfollow User
});


router.post('/users/:userID/block',(req, res)=>{
     // Block user
});

module.exports = router