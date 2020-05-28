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