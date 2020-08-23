const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path'); 



let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user:'atest18521@gmail.com',
        pass:'test@1234'
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("Error in rendering:  ",err);return;}
            
            mailHTML = template;
        }
    )
    console.log(mailHTML);
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}
