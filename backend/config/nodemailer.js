const nodemailer = require('nodemailer');


const transporter  = nodemailer.createTransport({

    host: 'pro3.mail.ovh.net',
    port: 587,
    secure: false,
    auth: {
        user: "recrutement@xsustain.io",
        pass: "test123@"
    }
    });
    module.exports = transporter;
