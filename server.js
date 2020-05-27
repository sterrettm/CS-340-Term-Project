const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const auth = require('./scripts/auth')
const handlers = require('./scripts/handlers')

var handlebarsExpress = require('express-handlebars')

var handlebarsEngine = handlebarsExpress.create({
	helpers: {}
})

const mysqlParams = require("./shadow/mysql.json")
const mysql = require('mysql')
var pool = mysql.createConnection(mysqlParams)

const app = express()
const port = 3000

app.engine('handlebars', handlebarsEngine.engine)
app.set('view engine', 'handlebars')
app.locals.layout = 'main'

app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use(function(req,res,next) {
    console.log(req.authorization)
    auth.validateSession(req,res,pool,function(){
        next()
    })
})

// GET Requests

app.get('/login', function (req,res){
    res.status(200).render("login", {})
})

app.get('/signup', function (req,res){
    res.status(200).render("signup", {})
})

app.get('/friends', function (req,res){
    handlers.friendsHandler(req,res,pool)
})

app.get('/messages/:otherUname', function(req,res){
    handlers.messagesHandler(req,res,req.params.otherUname,pool)
})

app.get('/', function(req,res){
    res.status(200).render("index", {})
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
    
})

app.listen(port, function(){})

// This heartbeat keeps the MySQL connection from being closed
var heartbeat = setInterval(function(){
    pool.query('SELECT 1', function(err,results,fields){})
}, 2000)