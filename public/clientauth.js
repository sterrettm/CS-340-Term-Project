function callLogin(username, password, success, err){
	$.ajax({
		type: "POST",
		url: "/api/login",
		headers: {
			"Authorization": "Basic " + btoa(username + ":" + password)
		},
		success: function(){
			success();
		},
		error: function(xhr, error){
			err()
		}
	})
}

function callLogout(success, err){
    $.ajax({
        type: "POST",
        url: "/api/logout",
        success: function(){
            success();
        },
        error: function(xhr, error){
            err()
        }
    })
}