import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full  text-sm font-medium transition
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
      >
        Prev
      </button>

      {/* Current Page */}
      <div className="px-4 py-2 rounded-full bg-[#E6FF06] font-semibold text-sm  border-black">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
