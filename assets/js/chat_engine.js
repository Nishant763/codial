class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...');

            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'Codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
            })
        });

        //on clicking the sendBtn send_message event should be fired 
        $('#sendBtn').click(function(){
            let msg = $('#message').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email: self.userEmail,
                    chatroom:'Codeial'
                })
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'user-message';
            }

            newMessage.append($('<span>',{
                'html':data.message,
                
                
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email,
            }))
            newMessage.addClass('message');
            newMessage.attr('id',messageType);
            $('#container-messages').append(newMessage);
        })

    }
}