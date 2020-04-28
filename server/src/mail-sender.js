const nodemailer = require("nodemailer");

const Accounts = {
    sender: {
        user: 'aaaaaaa@gmail.com',
        password: '123456789'
    },
    reciver: {
        user: 'bbbbbbb@gmail.com',
        password: '123456789'
    }
};

const transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    //port: 25,
    secure: true,
    service: 'gmail',
    auth: {
        user: Accounts.sender.user,
        pass: Accounts.sender.password
    }
});

async function send(form) {
    const mailOptions = setMailOptions(form);
    const wasSent = false;

    try {
        const sentMessageInfo = await transporter.sendMail(mailOptions);
        console.info("The mail has been sent successfully", sentMessageInfo);
        wasSent = true;
    } catch (error) {
        console.error("Failed to send email", error);
    }

    return wasSent;
}

function setMailOptions(form) {
    const attachments = setAttachments(form.attachments);
    const mailOptions = {
        from: Accounts.sender.user,
        to: Accounts.reciver.user,
        subject: form.subject,
        //html: "<h1>And here is the place for HTML</h1>",
        text: form.body,
        attachments: attachments
    };
    return mailOptions;
}

function setAttachments(files) {
    const attachments = [];
    files.forEach(file => {
        const a = {
            filename: file.filename,
            content: file.content,
            encoding: 'base64'
        }
        attachments.push(a);
    });

    return attachments;
}

module.exports = { send };