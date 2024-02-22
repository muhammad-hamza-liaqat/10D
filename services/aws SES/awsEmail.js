const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const SES_CONFIG = {
    region: "us-east-1",
// region: process.env.AWS_SES_REGION,
    credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    }
};

const sesClient = new SESClient(SES_CONFIG);

// Function to load and render EJS template
function renderTemplate(templatePath, templateData) {
    try {
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        return ejs.render(templateContent, templateData);
    } catch (err) {
        console.error('Error rendering email template:', err);
        return null;
    }
}

// Function to send templated email
async function sendTemplateEmail(recipientEmail, templateName, templateData) {
    try {
        const htmlBody = await renderTemplate(templateName, templateData);
        console.log(htmlBody);
        const params = {
            Source: '<email address you verified>',
            Template: templateName,
            Destination: {
                ToAddresses: [recipientEmail]
            },
            TemplateData: JSON.stringify(templateData)
        };
        const data = await sesClient.send(new SendTemplatedEmailCommand(params));
        console.log('Template email sent successfully:', data);
        return data;
    } catch (err) {
        console.error('Error sending template email:', err);
        throw err;
    }
}

module.exports = {
    sendTemplateEmail,
};
