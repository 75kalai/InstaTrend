const MongoStore = require('connect-mongo');

const sessionStore = new MongoStore({
     mongoUrl: process.env.MONGODB_URL,
     collection: 'customSessions', // Session collection name, not working?
     crypto: {
          // Transparent encryption/decryption of session data
          secret: process.env.MONGO_CONNECT_SECRET
     }
})

module.exports = sessionStore