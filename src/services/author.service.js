const httpStatus = require('http-status');
const { Author } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an author
 * @param {Object} authorBody
 * @returns {Promise<Author>}
 */
const createAuthor = async (authorBody) => {
  if (await Author.findOne({ where: { email: authorBody.email } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  }
  const author = await Author.create(authorBody);
  return author;
};

/**
 * Query for author
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAuthors = async (filter, options) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = (page - 1) * limit;

  const order = sortBy ? [sortBy.split(':')] : [['createdAt', 'DESC']];

  const author = await Author.findAll({
    where: filter,
    limit,
    offset,
    order,
  });

  return author;
};

/**
 * Get author by id
 * @param {number} id
 * @returns {Promise<Author>}
 */
const getAuthorById = async (id) => {
  return Author.findOne({ where: { id } });
};

/**
 * Get author by email
 * @param {string} email
 * @returns {Promise<Author>}
 */
const getAuthorByEmail = async (email) => {
  return Author.findOne({ where: { email } });
};

/**
 * Update author by id
 * @param {number} authorId
 * @param {Object} updateBody
 * @returns {Promise<Auhor>}
 */
const updateAuthorById = async (id, updateBody) => {
  const author = await getAuthorById(id);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }
  const emailTaken = await Author.findOne({
    where: { email: updateBody.email },
    exclude: { id },
  });
  if (emailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  await author.update(updateBody);
  return author;
};

/**
 * Delete author by id
 * @param {number} authorId
 * @returns {Promise<Author>}
 */
const deleteAuthorById = async (id) => {
  const author = await getAuthorById(id);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }
  await author.destroy();
  return author;
};

module.exports = {
  createAuthor,
  queryAuthors,
  getAuthorById,
  getAuthorByEmail,
  updateAuthorById,
  deleteAuthorById,
};
