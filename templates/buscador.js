var currentUserId = 0;
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                $('#username').html(response['username'])
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }


function allresumes(){
        $.ajax({
            url:'/resumes',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                var i = 0;
                $.each(response, function(){
                    f = '<div class="card mb-4">';
                    f = f + '<div class="card-body">';
                    f = f + '<h2 class="card-title">'+response[i].title+'</h2>';
                    f = f + '<p class="card-text">'+response[i].short_resume+'</p>';
                    f = f + '<a href="/static/resumen_plt.html" onclick="setId('+response[i].id+')" class="btn btn-primary">Read More &rarr;</a></div></div>';
                    $('#allresumes').append(f);
                    i = i+1;
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }
