const mongoose = require('mongoose');

mongoose
     .connect( process.env.MONGODB_URL )
     .then(() => { console.log('Connected to mongoDB'); })
     .catch((err) => { console.log(err); });
     
// mongoose.set('debug', true)
module.exports = mongoose