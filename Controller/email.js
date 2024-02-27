const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL, // Your Gmail email address
        pass: process.env.USER_APP_PASSWORD // Your Gmail password or an app-specific password
        // user: 'akhilpsaji1999@gmail.com', // Your Gmail email address
        // pass: 'thjq uxwq cibj cchg' // Your Gmail password or an app-specific password
    }
});

async function sendEmail(to, subject, html,attachments) {
    try {
        // Set up email data
        let mailOptions = { // Sender address
            to: to, // List of recipients
            subject: subject, // Subject line
            html: html,
            attachments: attachments // HTML body
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = { sendEmail };
