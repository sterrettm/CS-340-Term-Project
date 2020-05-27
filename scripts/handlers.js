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
function messages(req,res,otherUname,pool){
    if (res.locals.userID == -1){
        res.redirect('../login')
    }else{
        
    }
}

module.exports = {
    friendsHandler: friends,
    messagesHandler: messages
}