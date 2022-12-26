const {User} = require("../../models/user")

const {HttpError, sendEmail, createVerifyEmail} = require("../../helpers")

const resendEmail = async(req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user) {
    throw HttpError(404)
  }
  if(user.verify) {
    throw HttpError(400, "Email alredy verify")
  }

  const mail = createVerifyEmail(email, user.verificationToken);

  await sendEmail(mail)

  res.json({
    message: "Verify email resend ssucces"
  })

}

module.exports = resendEmail;