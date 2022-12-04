const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const updateUsers = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateUsers;
