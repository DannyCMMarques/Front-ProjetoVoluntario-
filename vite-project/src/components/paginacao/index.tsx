
const Paginacao = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg mx-1 bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-lg mx-1 ${
              currentPage === index + 1
                ? "bg-buttonBlue text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg mx-1 bg-gray-300 disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    );
  };

  export default Paginacao;
