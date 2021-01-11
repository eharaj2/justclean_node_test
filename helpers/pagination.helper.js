// Get Pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Get pagination data
const getPaginationData = (data, page, limit) => {
  const { count: totalItems, rows: rows} = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
};

module.exports = {
	getPagination,
	getPaginationData,
};