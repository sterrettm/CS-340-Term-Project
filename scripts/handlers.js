const utils = require('./utils')

function friends(req,res,pool){
    if (res.locals.userID == -1){
        res.redirect('/login')
    }else{
        // Now we need the list of all friends
        pool.query('CALL getFriends(?);',[res.locals.userID],function(err,results,fields){
            if (err){
                utils.redirectWithNote(res,"/messages","An internal server error occured.")
            }else{
                res.status(200).render("friends",{friends: results[0], locals: res.locals})
            }
        })
    }
}
function userMessages(req,res,otherUname,pool){
    if (res.locals.userID == -1){
        res.redirect('../login')
    }else{
        pool.query('SELECT userID FROM Users WHERE username=?',[otherUname],function(err,results,fields){
            if (err){
                utils.redirectWithNote(res,"/messages","An internal server error occured.")
            }else if (results.length != 1){
                utils.redirectWithNote(res,"/messages","There is no user with username " + otherUname + ".")
            }else{
                var userID = res.locals.userID
                var otherUserID = results[0].userID
                pool.query('CALL getMessages(?,?);',[userID,otherUserID],function(err,results,fields){
                    if (err){
                        utils.redirectWithNote(res,"/messages","An internal server error occured.")
                    }else{
                        var messages = []
                        for (var i = 0; i < results[0].length; i++){
                            messages.push({})
                            messages[i].message = results[0][i].message
                            messages[i].side = {sent: "left", recv: "right"}[results[0][i].sentOrRecv]
                            messages[i].otherSide = {sent: "right", recv: "left"}[results[0][i].sentOrRecv]
                        }
                        res.status(200).render("userMessages",{messages: messages, otherUname: otherUname, locals: res.locals})
                    }
                })
            }
        })
    }
}

function messages(req,res,pool){
    if (res.locals.userID == -1){
        res.redirect('../login')
    }else{
        pool.query('CALL getMessagedPeople(?);',[res.locals.userID],function(err,results,fields){
            if (err){
                utils.redirectWithNote(res,"/messages","An internal server error occured.")
            }else{
                res.status(200).render("messages",{users: results[0], locals: res.locals})
            }
        })
    }
}

function newMessage(req,res,pool){
    if (res.locals.userID == -1){
        res.redirect('../login')
    }else{
        var otherUname = req.body.username
        var message = req.body.message
        if (message.length > 0){
            // First we need to get the userID of the user with that username
            pool.query('SELECT userID FROM Users WHERE username=?',[otherUname],function(err,results,fields){
                if (err){
                    res.sendStatus(500)
                }else if (results.length != 1){
                    res.sendStatus(400)
                }else{
                    var userID = res.locals.userID
                    var otherUserID = results[0].userID
                    
                    pool.query('INSERT INTO PrivateMessages (sendUserID, recvUserID, message, sentAt) VALUES (?,?,?,NOW())',
                    [userID, otherUserID,message],function(err,results,fields){
                        if (err){
                            res.sendStatus(500)
                        }else{
                            res.status(200).send(JSON.stringify({}))
                        }
                    })
                }
            })
        }else{
            res.sendStatus(400)
        }
    }
}

function otherUserPage(req,res,otherUname,pool){
    if (res.locals.userID == -1){
        res.redirect('/login')
    }else{
        if (otherUname == res.locals.username){
            userPage(req,res,pool)
        }else{
            pool.query('SELECT userID FROM Users WHERE username=?',[otherUname],function(err,results,fields){
                if (err){
                    res.sendStatus(500)
                }else if (results.length != 1){
                    res.sendStatus(400)
                }else{
                    var otherUserID = results[0].userID
                    pool.query('SELECT * FROM UserInterests WHERE userID=?',[otherUserID],function(err,results,fields){
                        if (err){
                            utils.redirectWithNote(res,"/user","An internal server error occured.")
                        }else{
                            res.status(200).render("otherUser",{interests: results, otherUsername: otherUname, locals: res.locals})
                        }
                    })
                }
            })
        }
    }
}

function userPage(req,res,pool){
    if (res.locals.userID == -1){
        res.redirect('/login')
    }else{
        pool.query('SELECT * FROM UserInterests WHERE userID=?',[res.locals.userID],function(err,results,fields){
            if (err){
                utils.redirectWithNote(res,"/user","An internal server error occured.")
            }else{
                res.status(200).render("user",{interests: results, locals: res.locals})
            }
        })
    }
}

function newInterest(req,res,pool){
    console.log("Yes")
    if (res.locals.userID == -1){
        res.redirect('../login')
    }else{
        var interest = req.body.interest
        if (interest.length > 0){
            var userID = res.locals.userID
            
            pool.query('INSERT INTO UserInterests (userID, interest) VALUES (?,?)',
            [userID, interest],function(err,results,fields){
                if (err){
                    console.log("1")
                    res.sendStatus(500)
                }else{
                    res.status(200).send(JSON.stringify({}))
                }
            })
        }else{
            console.log("2")
            res.sendStatus(400)
        }
    }
}

module.exports = {
    friendsHandler: friends,
    userMessagesHandler: userMessages,
    messagesHandler: messages,
    userPageHandler: userPage,
    otherUserPageHandler: otherUserPage,
    newMessageHandler: newMessage,
    newInterestHandler: newInterest
}