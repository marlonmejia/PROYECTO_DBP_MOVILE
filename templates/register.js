function createUser(){
        $("#carga").attr("hidden",false);
        $('#action').html("Authenticating...");
        var username = $('#exampleInputUsername').val();
        var name = $('#exampleFirstName').val();
        var fullname = $('#exampleLastName').val();
        var password = $('#exampleInputPassword').val();
        var password_rp = $('#exampleRepeatPassword').val();
        var message = JSON.stringify({
                "username": username,
                "name": name,
                "fullname": fullname,
                "password": password
            });

        $.ajax({
            url:'/users',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
            },
            error: function(response){
                //alert(JSON.stringify(response));
                if(password != password_rp){
                $("#carga").attr("hidden",true);
                $('#action').html("Password Incorrecto");
                }else{
                window.location.replace("/static/login.html");}
            }
        });
    }
