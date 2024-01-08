//serve media through 
require("../database")
const router = require('express').Router()

const path = require("path")

router.get("/:fileName", async (req, res, next) => {
     return res.sendFile(req.params.fileName, {
          root: path.join(__dirname, "../storage/posts/"),
          dotfiles: "deny",
          function(err) {
               if (err) {
                    next(err)
               } else {
                    console.log('Sent:', fileName)
               }
          }
     }) 
})

module.exports = router