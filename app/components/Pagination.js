import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-6">
      <button
        className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <span className="text-white px-4">Page {currentPage} of {totalPages}</span>
      <button
        className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
