{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                
                success: function (data) {
                   let newPost = newPostDom(data.data.post);
                   $('#posts-wall').prepend(newPost);
                   deletePost($(' .delete-post-button',newPost));
                    
                },
                error: function(error){
                    console.log(error.responseText);
                
                }
            }
        );

        })
    }

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
        <div class="post-comments">
            
                <h4>Comment</h4>
                <form action="/comments/create" method="post" id="new-post-comments">
                    <input type="text" name="content" placeholder="Add comment...." required></input>

                    <input type="hidden" value="${post._id} %>" name="post">
                    <input type="submit" value="Post Comment">
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}>">
                
            
                
                </ul>
            </div>
        </div>
       

        `);
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
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







    createPost();
}

    
