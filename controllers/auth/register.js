const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const {nanoid} = require('nanoid')

const { User } = require('../../models/user');
const { HttpError, sendEmail, createVerifyEmail} = require('../../helpers');

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;

  const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use")
    }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({ name, email, password: hashPassword, subscription, avatarURL, verificationToken });

  const verifyEmail = createVerifyEmail(email, verificationToken)

  await sendEmail(verifyEmail)

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
