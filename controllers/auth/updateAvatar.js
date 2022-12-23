const Jimp = require("jimp");
const path = require('path')
const fs = require("fs/promises")
const {User} = require('../../models/user')

const avatarsDir = path.join(process.cwd(), 'public/avatars');


const updateAvatar = async (req, res) => {
  const {_id} = req.user;

  const { path: temporaryName, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName)

  const img = await Jimp.read(temporaryName);
  await img.resize(250, 250).writeAsync(resultUpload);

  await fs.unlink(req.file.path);

  const avatarURL = path.join("avatars", fileName)

  const result = await User.findByIdAndUpdate(_id, {avatarURL}, { new: true })

  res.json({ avatarURL: result.avatarURL});
};

module.exports = updateAvatar;