const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const db = require('./models')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const app = express()

const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// setting template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    res.locals.user = req.user
    next()
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})

require('./routes')(app, passport)