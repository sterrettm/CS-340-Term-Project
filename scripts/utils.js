function redirectWithNote(res,url,msg){
    res.cookie("notification",msg)
    res.redirect(url)
}

module.exports = {
    redirectWithNote: redirectWithNote
}