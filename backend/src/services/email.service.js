import nodemailer from 'nodemailer';

import {
  HOST,
  SERVER,
  PORT,
  USERNAME,
  PASSWORD,
} from '../configs/email.config';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SERVER,
      port: PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: USERNAME, // generated ethereal user
        pass: PASSWORD, // generated ethereal password
      },
    });
  }

  async sendEmail(email, firstname, token) {
    try {
      console.log(token);
      // send mail with defined transport object
      return await this.transporter.sendMail({
        from: `"URL Shorter 👻" <manager@URLShorter.ir>`, // sender address
        to: email, // list of receivers
        subject: 'Reset Password ✔', // Subject line
        html: `<b>Dear ${firstname}, Reset Password URL: <a href="${HOST}/auth/forget/${token}">Reset Password</a></b>`, // html body
      });
    } catch (err) {
      throw err;
    }
  }
}

export default EmailService;
