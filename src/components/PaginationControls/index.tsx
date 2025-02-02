export default function PaginationControls({
  currentPage,
  setCurrentPage,
  totalPages, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const range = 2; // Number of pages to show before and after the current page

  const startPage = Math.max(1, currentPage - range); // The first page to show
  const endPage = Math.min(totalPages, currentPage + range); // The last page to show

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded-l-lg ${
          currentPage === 1 ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>

      {/* First Page Button */}
      {currentPage > range + 1 && (
        <button
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600"
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      )}

      {/* Ellipsis before the current page if there are pages in between */}
      {currentPage > range + 2 && (
        <span className="px-3 py-2 bg-gray-700">...</span>
      )}

      {/* Page Numbers */}
      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            className={`px-3 py-2 ${
              currentPage === page
                ? "bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

      {/* Ellipsis after the current page if there are pages in between */}
      {currentPage < totalPages - range - 1 && (
        <span className="px-3 py-2 bg-gray-700">...</span>
      )}

      {/* Last Page Button */}
      {currentPage < totalPages - range && (
        <button
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-r-lg ${
          currentPage === totalPages
            ? "bg-gray-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
