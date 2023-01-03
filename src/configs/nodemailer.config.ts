import nodemailer from 'nodemailer';

const account = JSON.parse(process.env.NODEMAILER_ACCOUNT || '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    ...account,
  },
});

export default transporter;
