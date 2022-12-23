require('dotenv').config();

const {BASE_URL} = process.env

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Please, confirm you email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}"> Click verify you email</a>`,
  }

  return mail;
}

module.exports = createVerifyEmail;