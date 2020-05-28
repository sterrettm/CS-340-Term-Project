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

function callSignup(username, password, dob, success, err){
    
    var bodyObject = {username: username, password: password, dob: dob}
    
    $.ajax({
        type: "POST",
        url: "/api/signup",
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

function callLogout(success, err){
    $.ajax({
        type: "POST",
        url: "/api/logout",
        success: function(){
            Cookies.remove('userID')
            Cookies.remove('username')
            Cookies.remove('token')
            success();
        },
        error: function(xhr, error){
            Cookies.remove('userID')
            Cookies.remove('username')
            Cookies.remove('token')
            err()
        }
    })
}