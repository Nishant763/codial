

{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        // response.flash('success','AJAX post creation!');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                
                success: function (data) {
                    console.log(data)
                   let newPost = newPostDom(data.data.post);
                   console.log("NP",newPost)
                   $('#posts-wall').prepend(newPost);
                   
                   deletePost($('.delete-post-button'));

                   // ye pata ni kya h 1st time aaya tha aap dekh lo mein baad me doubt raise karta hoon aaj,then solve kar dena ok
                   new Noty({
                    theme:'relax',
                    text: 'post created',
                    type:'success',
                    layout:'topRight',
                    timeout: 1500
                }).show();
                   },
                error: function(error){
                    console.log(error.responseText);
                
                }
            }
        );
        

        })
    }
    //do i need to add the noty object in the end of this file? 1st solved this issue then noty open chrome
    //method to create a post in DOM
    let newPostDom = function(post){
        
        return $(`<li id="post-${ post._id}">
                <div id="post">
                <div id="user_name"> ${post.user.username}</div>
                <div id="post-content">
                    ${ post.content }
                </div>
                <div id="created-at">
                    <small>${ post.createdAt }></small>
                </div>
                
                <div id="delete-post">
                    <a class="delete-post-button" href="/posts/destroy/${ post._id}>">Delete Post</a>
                </div>
                
            </div>
        </li>
        
        
    
        `);
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        // response.flash('success','AJAX post deletion'); 
        let deleteLinks = $(' .delete-post-button');
        for(d of deleteLinks){
            d.click(function(e){
                e.preventDefault();
            
                $.ajax({
                    type: "get",
                    url: $(deleteLink).prop('href'),
                    data: "data",
                    
                    success: function (data) {
                        $(`post-${post._id}`).remove();
                    }
                });
            })
        }
        console.log(deleteLinks);
        
    }







    createPost();
}

    
