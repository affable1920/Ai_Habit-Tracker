const paginate = (currentPage, pageSize, data) => {
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
};

export default paginate;
