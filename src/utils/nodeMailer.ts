import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    }
});
