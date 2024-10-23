import * as nodemailer from 'nodemailer';

const { EMAIL_SERVICE } = process.env;
const { ORIGIN_EMAIL } = process.env;
const { EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: EMAIL_SERVICE,
  auth: {
    user: ORIGIN_EMAIL,
    pass: EMAIL_PASS,
  },
});

export default transporter;