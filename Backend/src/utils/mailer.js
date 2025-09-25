import nodemailer from 'nodemailer'

const transport = new nodemailer.createTransport({
    host : process.env.SMTP_HOST,
    port : Number(process.env.SMTP_PORT ||587),
    secure : false,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    }
});

const sendMail = async({to,subject,html})=>{
    const from = process.env.SMTP_FROM;
    await transport.sendMail({from,to,subject,html});
}

export {sendMail};