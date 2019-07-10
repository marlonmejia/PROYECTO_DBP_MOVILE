function loadResume(){
    $.ajax({
        url:'/resumen',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            $('#resume_name').html(response.title);
            $('#date_time').append(response.sent_on);
            $('#content').append(response.content);
            $('#resume_autor').append(response.autor);
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}
