const express = require('express')
const cookieParser = require('cookie-parser')
const auth = require('./scripts/auth')

var handlebarsExpress = require('express-handlebars')

var handlebarsEngine = handlebarsExpress.create({
	helpers: {}
})

const mysqlParams = require("./shadow/mysql.json")
const mysql = require('mysql')
var connection = mysql.createConnection(mysqlParams)

var err = connection.connect(function(err) {
    if (err) {
        console.error("FATAL ERROR: " + err.code + "\n" + err.stack);
        process.exit(1)
        return;
    }
    else
    {
      console.log("DB Connection Established")
    }
});

const app = express()
const port = 3000

app.engine('handlebars', handlebarsEngine.engine)
app.set('view engine', 'handlebars')
app.locals.layout = 'main'

app.use(cookieParser())
app.use(express.static("public"))

app.use(function(req,res,next) {
    console.log(req.authorization)
    auth.validateSession(req,res,next)
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
    auth.login(req,res,connection)
})

app.post('/api/signup', function(req,res){
    auth.signup(req,res,connection)
})

app.listen(port, function(){})