


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
                   
                   deletePost($('.delete-post-button'),newPost);
                   
                   // call the create comment class
                   new PostComments(data.data.post._id);

                   // CHANGE :: enable the functionality of the toggle like button on the new post
                   new ToggleLike($(' .toggle-like-button',newPost);

                   
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
                <div id="like-post-${post._id}>">
                
               <a class="toggle-like-button" data-likes="0" href="/likes/toggleLike/?id=${post._id}&type=Post">
                    <i class="fa fa-heart"></i> 0
              </a> 
           
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

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }





    createPost();
    convertPostsToAjax();
}

    
