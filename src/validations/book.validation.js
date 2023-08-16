const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBook = {
  body: Joi.object().keys({
    genre: Joi.string().required(),
    description: Joi.string(),
    title: Joi.string().required(),
    pages: Joi.number().required(),
    isbn: Joi.number().integer().required(),
    author_id: Joi.number().integer().required(),
  }),
};

const getBooks = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const updateBook = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      genre: Joi.string(),
      description: Joi.string(),
      title: Joi.string(),
      pages: Joi.number(),
      author_id: Joi.number(),
    })
    .min(1),
};

const deleteBook = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
