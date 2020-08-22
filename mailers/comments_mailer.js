const nodeMailer = require('../config/nodemailer');

//another way of exporting a method
exports.newComment = (comment)=>{
    console.log("Inside newComment Mailer",comment);
    nodeMailer.transporter.sendMail({
        from:'yoshibhatia@gmail.com',
        to: comment.user.email,
        subject:'New comment published',
        html:'<h1>Yup! Your comment has been published!</h1>'
    },(err,info)=>{
        if(err){
            console.log("Error in sending email!",err);
            return;
        }

        console.log('Message sent!',info);
        return;

    })

}