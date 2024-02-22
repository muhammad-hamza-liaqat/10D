const path = require('path');
const { sendTemplateEmail } = require('../services/aws SES/awsEmail');

const templateData = {
    name: 'John Doe',
    otp: '03144099558'
};
const recipientEmail = 'mh408800@gmail.com';
const templateName = 'otpTemplate';
const templatePath = path.join(__dirname, '../services/aws SES/otpTemplate.ejs');
(async () => {
    try {
        const result = await sendTemplateEmail(recipientEmail, templatePath, templateData);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
})();
