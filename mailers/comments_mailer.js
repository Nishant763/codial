const nodeMailer = require('../config/nodemailer');

//another way of exporting a method
exports.newComment = (comment)=>{

    let htmlString = nodeMailer.renderTemplate(comment,'/comments/new_comment.ejs');

    console.log("Inside newComment Mailer",comment);
    nodeMailer.transporter.sendMail({
        from:'bhatianishant763@gmail.com',
        to: comment.user.email,
        subject:'New comment published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending email!",err);
            return;
        }

        console.log('Message sent!',info);
        return;

    })

}