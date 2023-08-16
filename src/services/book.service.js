const httpStatus = require('http-status');
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a book
 * @param {Object} bookBody
 * @returns {Promise<Book>}
 */
const createBook = async (bookBody) => {
  if (await Book.findOne({ where: { isbn: bookBody.isbn } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exists');
  }
  const book = await Book.create(bookBody);
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad request');
  }
  return book;
};

/**
 * Query for books
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBooks = async (filter, options) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = (page - 1) * limit;

  const order = sortBy ? [sortBy.split(':')] : [['createdAt', 'DESC']];

  const books = await Book.findAll({
    where: filter,
    limit,
    offset,
    order,
  });

  return books;
};

/**
 * Get book by id
 * @param {number} id
 * @returns {Promise<Book>}
 */
const getBookById = async (id) => {
  return Book.findOne({ where: { id } });
};

/**
 * Get book by email
 * @param {string} email
 * @returns {Promise<Book>}
 */
const getBookByEmail = async (email) => {
  return Book.findOne({ where: { email } });
};

/**
 * Update book by id
 * @param {number} bookId
 * @param {Object} updateBody
 * @returns {Promise<Book>}
 */
const updateBookById = async (bookId, updateBody) => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const isbnTaken = await Book.findOne({
    where: { isbn: updateBody.isbn },
    exclude: { id: bookId },
  });
  if (isbnTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ISBN already exists');
  }
  await book.update(updateBody);
  return book;
};

/**
 * Delete book by id
 * @param {number} bookId
 * @returns {Promise<Book>}
 */
const deleteBookById = async (id) => {
  const book = await getBookById(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  await book.destroy();
  return book;
};

module.exports = {
  createBook,
  queryBooks,
  getBookById,
  getBookByEmail,
  updateBookById,
  deleteBookById,
};
