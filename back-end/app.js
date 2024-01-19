require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors')

var session = require('express-session');
const sessionStore = require('./database/mongoStore')
const { v4: uuidv4 } = require('uuid');
const { verifyAuth } = require('./utils/authUtil')

const authRoute = require('./routes/auth')
const mediaRoute = require('./routes/media')
const postsRoute = require('./routes/posts')
const searchRoute = require('./routes/search')
const profileRoute = require('./routes/profile')
const feedsRoute = require('./routes/feed')
const exploreRoute = require('./routes/explore')
const settingsRoute = require('./routes/settings')

var corsOptions = {
     origin: process.env.FRONT_END_URL,
     optionsSuccessStatus: 200,
     credentials: true
}
app.use(cors(corsOptions));
app.use(express.json())

app.get("/", (req, res) => {
     res.send("Backend Server is alive");
})

app.use(session(
     {
          genid: (req) => uuidv4(),
          secret: process.env.EXPRESS_SESSION_SECRET,
          resave: true,
          saveUninitialized: false,
          cookie: {
               maxAge: 60 * 60 * 1000,
               secure: false,
               sameSite: "lax"
          },
          store: sessionStore,
     })
)
app.use((req, res, next) => {
     console.log('\n\n\n --------------- Incomming Request --------------------');
     console.log(`${req.method} : ${req.path} `);
     console.log('BODY:', req.body);
     next()
})
app.use('/api/v1/auth', authRoute)
// All further routes will need authenticaion.
app.use(verifyAuth)
app.use('/api/v1/media', mediaRoute)
app.use('/api/v1/posts', postsRoute)
app.use('/api/v1/search', searchRoute)
app.use('/api/v1/profile', profileRoute)
app.use('/api/v1/feeds', feedsRoute)
app.use('/api/v1/explore', exploreRoute)
app.use('/api/v1/settings', settingsRoute)

app.use((err, req, res, next) => {
     console.error("SERVER ERROR : ", err)
     next()
})

app.listen(process.env.PORT, () => {
     console.log("Backend live at http://localhost:" + process.env.PORT)
})

module.exports = {
     sessionStore,
}