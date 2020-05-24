
function validateSession(req, res, callback){
    // First, set default values for userID and username
    res.locals.userID = -1
    res.locals.username = "ERROR"
    
    var cookies = req.cookies
    
    if ('userID' in cookies && 'username' in cookies && 'token' in cookies){
        // We need to validate the user's session
        var testUserID = req.cookies.userID
        var testUsername = req.cookies.username
        var testToken = req.cookies.token
        
        console.log("UserID:" + testUserID + "; Username:" + testUsername + "; Token: " + testToken)
        
        callback()
    
    }else{
        // There isn't any session data to check
        console.log("No session to validate")
        callback()
    }
    
}

function login(req, res, connection){
    console.log(req.headers.authorization)
    
    var unencodedString = Buffer.from(req.headers.authorization.split(" ")[1],'base64').toString('ascii')
    console.log("AUTH String: " + unencodedString)
    var sentUsername = unencodedString.split(':')[0]
    var sentPassword = unencodedString.split(':')[1]
    console.log("UNAME: " + sentUsername + "\nPASSWD: " + sentPassword)
    
    // TODO Obviously make this a real check
        
    if (true){
        res.cookie('username', sentUsername)
        res.cookie('userID', 8)
        res.cookie('token', "totallyAToken", {httpOnly: true})
        res.sendStatus(200);
    }else{
        res.sendStatus(401)
    }
}

function signup(req, res, connection){
    
}

module.exports = {
    validateSession: validateSession,
    login: login,
    signup: signup
}