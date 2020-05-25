const crypto = require('crypto')

function validateSession(req, res, pool, callback){
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
        pool.query('DELETE FROM LoginTokens WHERE expiryDateTime < NOW();',function(error, results, fields){
            pool.query('SELECT COUNT(*) AS matches FROM LoginTokens WHERE userID = ? AND token = ?;',[testUserID, testToken],function(error, results, fields){
                var matchCount = results[0].matches
                
                if (matchCount > 0){
                    // The user is logged in correctly
                    res.locals.userID = testUserID
                    res.locals.username = testUsername
                    
                    callback()
                }else{
                    // The user is not logged in correctly
                    // TODO should probably log the user out somehow in case of non-malicious errors like a token expiring
                    callback()
                }
            }) 
        })
    
    }else{
        // There isn't any session data to check
        console.log("No session to validate")
        callback()
    }
    
}

function login(req, res, pool){
    console.log(req.headers.authorization)
    
    var unencodedString = Buffer.from(req.headers.authorization.split(" ")[1],'base64').toString('ascii')
    console.log("AUTH String: " + unencodedString)
    var sentUsername = unencodedString.split(':')[0]
    var sentPassword = unencodedString.split(':')[1]
    console.log("UNAME: " + sentUsername + "\nPASSWD: " + sentPassword)
    
    // TODO Obviously make this a real check
    pool.query('SELECT userID FROM Users WHERE username = ?', [sentUsername], function(err, results, fields){
        if (results.length == 1){
            var userID = results[0].userID
            if (true){
                // Login was succesfull
                
                var newToken = crypto.randomBytes(32).toString('base64')
                
                pool.query('CALL newLoginToken(?,?,?);', [userID, newToken, 8], function(err, results, fields){
                    if (err) console.log(err)
                    res.cookie('username', sentUsername)
                    res.cookie('userID', userID)
                    res.cookie('token', newToken, {httpOnly: true})
                    res.sendStatus(200);
                })
                
            }else{
                // Login failed
                res.sendStatus(401)
            }
        }else{
            // Login failed
            res.sendStatus(401)
        }
    })
}

function signup(req, res, pool){
    
}

module.exports = {
    validateSession: validateSession,
    login: login,
    signup: signup
}