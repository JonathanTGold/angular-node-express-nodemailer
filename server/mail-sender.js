const nodemailer = require("nodemailer");

const senderAccount = { user: 'jonathan.gold86@gmail.com', password: '0546786671' };
const reciverAccount = { user: 'yta828@gmail.com', password: '0546786671' };

const transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    //port: 25,
    secure: true,
    service: 'gmail',
    auth: {
        user: senderAccount.user,
        pass: senderAccount.password
    }
});

async function sendMail(application) {
    const mailOptions = {
        from: senderAccount.user,
        to: reciverAccount.user,
        subject: application.subject,
        html: "<h1>And here is the place for HTML</h1>",
        text: application.body,
        attachments: [
            {
                filename: application.content.filename,
                content: application.content.content,
                encoding: 'base64'
            }
        ]
    };

    const sentMessageInfo = await transporter.sendMail(mailOptions);
    return sentMessageInfo;

}

module.exports = {
    sendMail
};