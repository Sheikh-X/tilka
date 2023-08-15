/* eslint-disable object-shorthand */
/* eslint-disable no-unneeded-ternary */
// /* eslint-disable no-param-reassign */

// const paginate = (schema) => {
//   /**
//    * @typedef {Object} QueryResult
//    * @property {Document[]} results - Results found
//    * @property {number} page - Current page
//    * @property {number} limit - Maximum number of results per page
//    * @property {number} totalPages - Total number of pages
//    * @property {number} totalResults - Total number of documents
//    */
//   /**
//    * Query for documents with pagination
//    * @param {Object} [filter] - Mongo filter
//    * @param {Object} [options] - Query options
//    * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
//    * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
//    * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//    * @param {number} [options.page] - Current page (default = 1)
//    * @returns {Promise<QueryResult>}
//    */
//   schema.statics.paginate = async function (filter, options) {
//     let sort = '';
//     if (options.sortBy) {
//       const sortingCriteria = [];
//       options.sortBy.split(',').forEach((sortOption) => {
//         const [key, order] = sortOption.split(':');
//         sortingCriteria.push((order === 'desc' ? '-' : '') + key);
//       });
//       sort = sortingCriteria.join(' ');
//     } else {
//       sort = 'createdAt';
//     }

//     const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
//     const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
//     const skip = (page - 1) * limit;

//     const countPromise = this.countDocuments(filter).exec();
//     let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

//     if (options.populate) {
//       options.populate.split(',').forEach((populateOption) => {
//         docsPromise = docsPromise.populate(
//           populateOption
//             .split('.')
//             .reverse()
//             .reduce((a, b) => ({ path: b, populate: a }))
//         );
//       });
//     }

//     docsPromise = docsPromise.exec();

//     return Promise.all([countPromise, docsPromise]).then((values) => {
//       const [totalResults, results] = values;
//       const totalPages = Math.ceil(totalResults / limit);
//       const result = {
//         results,
//         page,
//         limit,
//         totalPages,
//         totalResults,
//       };
//       return Promise.resolve(result);
//     });
//   };
// };

// module.exports = paginate;

const paginate = (model) => {
  return async (filter, options) => {
    const { sortBy, populate, limit, page } = options;

    let sort = sortBy ? sortBy : 'createdAt';
    if (sortBy) {
      const sortingCriteria = sortBy.split(',').map((sortOption) => {
        const [key, order] = sortOption.split(':');
        return [key, order === 'desc' ? 'DESC' : 'ASC'];
      });
      sort = sortingCriteria;
    }

    const pageSize = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const pageNumber = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const offset = (pageNumber - 1) * pageSize;

    const { count, rows } = await model.findAndCountAll({
      where: filter,
      order: sort,
      limit: pageSize,
      offset: offset,
      include: populate ? populate.split(',').map((path) => ({ all: true, path })) : [],
    });

    const totalPages = Math.ceil(count / pageSize);

    return {
      results: rows,
      page: pageNumber,
      limit: pageSize,
      totalPages,
      totalResults: count,
    };
  };
};

module.exports = paginate;
