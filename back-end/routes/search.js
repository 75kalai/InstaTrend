const router = require('express').Router()
const responseUtil = require('../utils/responseUtil')
const searchUtil = require('../utils/searchUtil')


router.get("/", async (req, res, next)=>{
     let results = await searchUtil.searchUser(req.query.query)
     res.json(responseUtil.constructSuccessJson(null, 
          results
     ))
})

module.exports = router