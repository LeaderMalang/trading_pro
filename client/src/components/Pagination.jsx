import { useState } from "react";
export const Pagination = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 4;
  const coinlists = [];
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
console.table(data.length )
  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px">
          {Array.from(
            { length: Math.ceil(data?.length / rowsPerPage) },
            (_, i) => i + 1
          ).map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100  rounded-md mx-2 hover:text-gray-700 ${
                  currentPage === pageNumber
                    ? "z-10 bg-green-300 border-green-300 text-green-700 hover:bg-green-400 hover:text-green-800"
                    : ""
                }`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
