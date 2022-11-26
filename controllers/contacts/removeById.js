const { Contact } = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
      throw HttpError(404);
    }

    res.json({
      message: 'Contacts deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
