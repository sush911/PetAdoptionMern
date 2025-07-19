require('dotenv').config();
const nodemailer = require('nodemailer');

// Debug logs to check .env values
console.log("🟢 Email:", process.env.EMAIL_USER);
console.log("🟡 App Password Length:", process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
