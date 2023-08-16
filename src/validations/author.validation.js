const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAuthor = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const getAuthors = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};

const updateAuthor = {
  params: Joi.object().keys({
    authorId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deleteAuthor = {
  params: Joi.object().keys({
    authorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
