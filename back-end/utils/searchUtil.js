const userDB = require('../database/schemas/users');

module.exports = {
     searchUser: async (query) => {

          let results = await userDB.find(
               {
                    username: {
                         "$regex": query,
                         "$options": "i"
                    }
               }, {
                    _id:1,
                    username:1,
                    profilePhotoThumbURL:1
               }
          )
          return results
     }
}