const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateUsers = require('./updateUsers');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUsers,
  updateAvatar,
};
