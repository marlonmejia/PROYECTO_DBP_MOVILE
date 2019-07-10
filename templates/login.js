function getData(){
        $("#carga").attr("hidden",false);
        $('#action').html("Authenticating...");
        var username = $('#username').val();
        var password = $('#password').val();
        var message = JSON.stringify({
                "username": username,
                "password": password
            });

        $.ajax({
            url:'/authenticate',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
            },
            error: function(response){
                //alert(JSON.stringify(response));
                if(response['status'] == 401){
                $("#carga").attr("hidden",true);
                $('#action').html(response['statusText']);
                }else{
                window.location.replace("/static/buscador.html");}
            }
        });
    }
