function friends(req,res,pool){
    if (res.locals.userID == -1){
        res.redirect('/login')
    }else{
        // Now we need the list of all friends
        pool.query('CALL getFriends(?);',[res.locals.userID],function(err,results,fields){
            if (err){
                res.sendStatus(500)
            }else{
                res.status(200).render("friends",{friends: results[0]})
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
                res.sendStatus(500)
            }else if (results.length != 1){
                res.sendStatus(400)
            }else{
                var userID = res.locals.userID
                var otherUserID = results[0].userID
                pool.query('CALL getMessages(?,?);',[userID,otherUserID],function(err,results,fields){
                    if (err){
                        res.sendStatus(500)
                    }else{
                        var messages = []
                        for (var i = 0; i < results[0].length; i++){
                            messages.push({})
                            messages[i].message = results[0][i].message
                            messages[i].side = {sent: "left", recv: "right"}[results[0][i].sentOrRecv]
                            messages[i].otherSide = {sent: "right", recv: "left"}[results[0][i].sentOrRecv]
                        }
                        res.status(200).render("userMessages",{messages: messages, otherUname: otherUname})
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
                res.sendStatus(500)
            }else{
                res.status(200).render("messages",{users: results[0]})
            }
        })
    }
}

module.exports = {
    friendsHandler: friends,
    userMessagesHandler: userMessages,
    messagesHandler: messages
}