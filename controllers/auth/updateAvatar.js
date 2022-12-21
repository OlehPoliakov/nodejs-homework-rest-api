const path = require('path')
const fs = require("fs/promises")


const {User} = require('../../models/user')

const avatarsDir = path.join(process.cwd(), 'public/avatars');


const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const { path: temporaryName, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName)
  await fs.rename(temporaryName, resultUpload);
  const avatarURL = path.join("avatars", fileName)
  await User.findByIdAndUpdate(_id, {avatarURL})
  res.json({ message: 'Avater uploaded successfully', avatarURL});
};

module.exports = updateAvatar;