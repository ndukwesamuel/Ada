export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2 flex-wrap">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm border rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-green-600 hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm border rounded ${
            page === currentPage
              ? "bg-green-500 text-white"
              : "bg-white text-green-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm border rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-green-600 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
