require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        const trasporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "ahmaddx900@gmail.com",
                pass: "zohhikxolypsknrx"
            }
        })

        await trasporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })

        console.log('email sent successfully');
    } catch (error) {
        console.log('email not sent');
        console.log(error);
        throw Error('User successfully created but email not sent')
    }
}