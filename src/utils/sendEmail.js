import nodemailer from 'nodemailer';

import {sendErrorResponse} from './sendResponse';
require('dotenv').config()

const user = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: user,
            pass: pass,
         },
    secure: true,
});

export const sendEmail = async (mailData) => {
    const {from,to,subject,text,html} = mailData;

    if (!from || !to || (!subject && !text)){
        return sendErrorResponse("Email body Error",422,"Please include send information correctly")
    }

    await transporter.sendMail(mailData, function (error, info) {
        if(error){
            console.log(error)
        }else{
            console.log(info)
        }
     });

}
