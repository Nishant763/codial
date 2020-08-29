$('#addFriend').click(function(e){
    e.preventDefault();

    let to_user_id = this.name;
    let from_user_id = $('#addFriend').attr('data-from');
    console.log(to_user_id," ",from_user_id);
    let data = {to:to_user_id,from: from_user_id};
    $.ajax({
        type: "POST",
        url: "/users/friends",
        data: data,
        
        success: function (response) {
            console.log(response);
        }
        
    }).fail((err)=>{
        console.log(err);
        return;
    });
})