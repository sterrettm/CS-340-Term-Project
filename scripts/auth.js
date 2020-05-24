
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
}

function signup(req, res, connection){
    
}

module.exports = {
    validateSession: validateSession,
    login: login,
    signup: signup
}