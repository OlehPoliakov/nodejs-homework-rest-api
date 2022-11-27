const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErrors } = require('../helpers');

const genders = ['male', 'female'];

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: genders,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string()
    .valid(...genders)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);
// contacts => contact (Монгус розуміє, пишемо іменник в однині обовьязково)
// Exemple = categories => category

module.exports = {
  Contact,
  schemas,
};
