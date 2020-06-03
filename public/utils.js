function newMessage(otherUsername, message, success, err){
    
    var bodyObject = {username: otherUsername, message: message}
    
    $.ajax({
        type: "POST",
        url: "/api/newmessage",
        data: JSON.stringify(bodyObject),
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}

function addNewInterest(interestName, success, err){
    
    var bodyObject = {interest: interestName}
    
    $.ajax({
        type: "POST",
        url: "/api/newinterest",
        data: JSON.stringify(bodyObject),
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}

function removeInterest(interestName, success, err){
    
    var bodyObject = {interest: interestName}
    
    $.ajax({
        type: "POST",
        url: "/api/removeinterest",
        data: JSON.stringify(bodyObject),
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}

function addNewFriend(friendName, success, err){
    
    var bodyObject = {friendName: friendName}
    
    $.ajax({
        type: "POST",
        url: "/api/newfriend",
        data: JSON.stringify(bodyObject),
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}

function removeFriend(friendName, success, err){
    
    var bodyObject = {friendName: friendName}
    
    $.ajax({
        type: "POST",
        url: "/api/removefriend",
        data: JSON.stringify(bodyObject),
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}

function setNextNotification(msg){
    Cookies.set('notification',msg)
}