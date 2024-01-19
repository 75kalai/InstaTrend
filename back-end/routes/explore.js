const responseUtil = require('../utils/responseUtil');
const userDB = require('../database/schemas/users');
const router = require('express').Router();

router.get('/', async (req, res)=>{

     let limit=10;

     let posts = await userDB.aggregate([
          {
               $unwind: '$posts' 
          },
          {
               $sort: {
                    'posts.likes': -1 // TODO:
               }
          },
          {
               $limit: limit
          },
          {
               $project:{
                    username:1,
                    posts:1,
                    profilePhotoURL:1,
                    profilePhotoThumbURL:1,
                    posts:1
               }
          }
     ])

     res.status(200).json(responseUtil.constructSuccessJson(`Top ${limit} posts are retrieved`, posts))

});

module.exports = router

