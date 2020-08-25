const nodeMailer = require('../config/nodemailer');

exports.newPass = (reset_pass_token)=>{
    let htmlString = nodeMailer.renderTemplate({reset_pass_token:reset_pass_token},'/reset/new_password.ejs');

    console.log("Inside Password Reset Mailer ",reset_pass_token);

    nodeMailer.transporter.sendMail({
        from:'atest18521@gmail.com',
        to: reset_pass_token.user.email,
        subject:'Password Reset Link',
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