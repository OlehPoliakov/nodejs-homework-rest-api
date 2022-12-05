const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErrors } = require('../helpers');

const genders = ['male', 'female', ''];

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set Email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set Phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: genders,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().valid(...genders),
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

module.exports = {
  Contact,
  schemas,
};
