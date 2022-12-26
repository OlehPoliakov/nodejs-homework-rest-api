const nodemailer = require("nodemailer")
require('dotenv').config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
  host: "smt.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "oleh.yurievi4@meta.ua",
    pass: META_PASSWORD,
  }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const email = {
  to: "maxefot600@khaxan.com",
  from: "oleh.yurievi4@meta.ua",
  subject: "Verify email",
  html: "<p>Verify you email</p>"
}

transport.sendMail(email)
  .then(() => console.log('Email send success'))
    .catch(error => console.log(error.message))