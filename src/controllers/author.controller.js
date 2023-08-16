const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { authorService } = require('../services');

const createAuthor = catchAsync(async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  res.status(httpStatus.CREATED).send(author);
});

const getAuthors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await authorService.queryAuthors(filter, options);
  res.send(result);
});

const getAuthor = catchAsync(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.id);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }
  res.send(author);
});
const updateAuthor = catchAsync(async (req, res) => {
  const author = await authorService.updateAuthorById(req.params.id, req.body);
  res.send(author);
});
const deleteAuthor = catchAsync(async (req, res) => {
  await authorService.deleteAuthorById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
