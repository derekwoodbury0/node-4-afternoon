require('dotenv').config()
const express = require('express')
const session = require('express-session')
let app = express()
let { SESSION_SECRET, SERVER_PORT } = process.env
let checkForSession = require('./middlewares/checkForSession')
let swagCtrl = require('./controllers/swagController')
let authCtrl = require('./controllers/authController')
let cartCtrl = require('./controllers/cartController')
let searchCtrl = require('./controllers/searchController')

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagCtrl.read)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))