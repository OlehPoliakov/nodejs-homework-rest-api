const { Contact } = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: 'Contacts deleted',
  });
};

module.exports = removeById;
