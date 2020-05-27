const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const auth = require('./scripts/auth')

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
    // TEST CODE FROM STACKEXCHANGE
    pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        // should actually use an error-first callback to propagate the error, but anyway...
        if (error) return console.error(error);
        console.log('The solution is: ', results[0].solution);
    });
    // END STACKEXCHANGE TEST CODE
    console.log(req.authorization)
    auth.validateSession(req,res,pool,function(){
        console.log("ID   : " + res.locals.userID)
        console.log("UNAME: " + res.locals.username)
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

app.listen(port, function(){})