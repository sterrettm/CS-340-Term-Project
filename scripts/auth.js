const crypto = require('crypto')
const bcrypt = require('bcrypt')

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
        callback()
    }
    
}

function login(req, res, pool){
    
    var unencodedString = Buffer.from(req.headers.authorization.split(" ")[1],'base64').toString('ascii')
    var sentUsername = unencodedString.split(':')[0]
    var sentPassword = unencodedString.split(':')[1]
    
    // TODO Obviously make this a real check
    pool.query('SELECT userID FROM Users WHERE username = ?', [sentUsername], function(err, results, fields){
        if (err){
            res.sendStatus(500)
        }else if (results.length == 1){
            var userID = results[0].userID
            // Get the hashed password from signup
            pool.query('SELECT password FROM Users WHERE userID=?',[userID],function(err,results,fields){
                if (err){
                    res.sendStatus(500)
                }else{
                    var hashedPassword = results[0].password
                    bcrypt.compare(sentPassword, hashedPassword, function(err, result){
                        if (err){
                            res.sendStatus(500)
                        }else if (result){
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
                    })
                }
            })
        }else{
            // Login failed
            res.sendStatus(401)
        }
    })
}

function signup(req, res, pool){

    var username = req.body.username
    var password = req.body.password
    var dob = req.body.dob

    pool.query('SELECT COUNT(*) AS matches FROM Users WHERE username=?',[username],function(err, results, fields){
        if (err){
            res.sendStatus(500)
        }else{
            var matchCount = results[0].matches
            if (matchCount > 0){
                // Can't have duplicate usernames
                res.sendStatus(403)
            }else{
                // Username is good, so next we try and validate the given date
                pool.query('SELECT DATE(?) AS result',[dob],function(err,results,fields){
                    if (err){
                        res.sendStatus(500)
                    }else{
                        var isDate = results[0].result != null
                        if (!isDate){
                            // Can't use invalid date
                            res.sendStatus(401)
                        }else{
                            console.log("Date Success")
                            // Should be good to add it
                            // Need to hash password
                            bcrypt.hash(password,14,function(err, hash){
                                if (err){
                                    res.sendStatus(500)
                                }else{
                                    // Finally we can insert a new user
                                    pool.query('INSERT INTO Users (username,password,birthDate) VALUES (?,?,?)',[username,hash,dob],function(err,results,fields){
                                        if (err){
                                            res.sendStatus(500)
                                        }else{
                                            res.status(200).send(JSON.stringify({}))
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
                
            }
        }
    })
}

function logout(req, res, pool){
    if (res.locals.userID != -1){
        var userID = res.locals.userID
        var token = req.cookies.token
        
        res.clearCookie('userID')
        res.clearCookie('username')
        res.clearCookie('token')
        
        pool.query('DELETE FROM LoginTokens WHERE userID=? AND token=?',[userID, token], function(err,results,fields){
            // It doesn't actually matter what this query returns; failure here does not matter
            res.sendStatus(200)
        })
    }else{
        res.sendStatus(401)
    }
}

module.exports = {
    validateSession: validateSession,
    login: login,
    signup: signup,
    logout: logout
}