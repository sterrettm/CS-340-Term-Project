const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const auth = require('./scripts/auth')
const handlers = require('./scripts/handlers')
const helpers = require('./scripts/helpers')

var handlebarsExpress = require('express-handlebars')

var handlebarsEngine = handlebarsExpress.create({
	helpers: helpers
})

const mysqlParams = require("./shadow/mysql.json")
const mysql = require('mysql')
var pool = mysql.createConnection(mysqlParams)

const app = express()
const port = 48766

app.engine('handlebars', handlebarsEngine.engine)
app.set('view engine', 'handlebars')
app.locals.layout = 'main'

app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use(function(req,res,next){
    res.locals.query = req.query
    res.locals.cookies = req.cookies

    // Special code to support notifications
    if ('notification' in req.cookies){
        res.clearCookie('notification')
    }

    next()
})
app.use(function(req,res,next){
    auth.validateSession(req,res,pool,function(){
        next()
    })
})

// GET Requests

app.get('/login', function (req,res){
    res.status(200).render("login", {locals: res.locals})
})

app.get('/signup', function (req,res){
    res.status(200).render("signup", {locals: res.locals})
})

app.get('/friends', function (req,res){
    handlers.friendsHandler(req,res,pool)
})

app.get('/messages/:otherUname', function(req,res){
    handlers.userMessagesHandler(req,res,req.params.otherUname,pool)
})

app.get('/messages', function(req,res){
    handlers.messagesHandler(req,res,pool)
})

app.get('/user', function(req,res){
    handlers.userPageHandler(req,res,pool)
})

app.get('/user/:otherUname',function(req,res){
    handlers.otherUserPageHandler(req,res,req.params.otherUname,pool)
})

app.get('/search', function(req,res){
    handlers.userSearchHandler(req,res,pool);
})

app.get('/', function(req,res){
    res.status(200).render("index", {locals: res.locals})
})

// POST Requests

app.post('/api/login', function(req,res){
    auth.login(req,res,pool)
})

app.post('/api/signup', function(req,res){
    auth.signup(req,res,pool)
})

app.post('/api/logout', function(req,res){
    auth.logout(req,res,pool)
})

app.post('/api/newmessage', function(req,res){
    handlers.newMessageHandler(req,res,pool)
})

app.post('/api/newinterest', function(req,res){
    handlers.newInterestHandler(req,res,pool)
})

app.post('/api/newfriend', function(req,res){
    handlers.newFriendHandler(req,res,pool)
})

app.listen(port, function(){})

// This heartbeat keeps the MySQL connection from being closed
var heartbeat = setInterval(function(){
    pool.query('SELECT 1', function(err,results,fields){})
}, 2000)