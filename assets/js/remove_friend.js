$('#removeFriend').click(function(e){
    e.preventDefault();
    isFriend = true;
    let to_user_id = this.name;
    let from_user_id = $('#removeFriend').attr('data-from');
    console.log(to_user_id," ",from_user_id);
    let data = {to:to_user_id,from: from_user_id};
    let myelR;
    $.ajax({
        type: "POST",
        url: "/users/unfriends",
        data: data,
        cache: false,
        async: true,
        success: function (response) {
            console.log(response);
             myelR = '<button type="submit" id="addFriend" name='+response.data.to_user._id+' data-from='+response.data.from_user._id+'>'+'Add Friend </button>';
            
            
        }
        
    }).fail((err)=>{
        console.log(err);
        return;
    });
    // $('#buttonContainer').clear();
    $('#buttonContainer').html(myelR);
    
})

