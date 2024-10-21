import * as nodemailer from 'nodemailer'

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const ORIGIN_EMAIL = process.env.ORIGIN_EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS


export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: EMAIL_SERVICE,
  auth: {
    user: ORIGIN_EMAIL,
    pass: EMAIL_PASS
  }
})