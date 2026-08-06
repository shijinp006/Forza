const inter = { fontFamily: "Inter, sans-serif" };

export const PaginationFooter = ({ currentPage, totalPages, totalItems, startIndex, endIndex, onPageChange }) => {
    return (
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5 border-t border-gray-100 bg-white">
            <span style={{ ...inter, fontWeight: 400, fontSize: "11.5px" }} className="text-gray-500">
                {totalItems > 0
                    ? `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`
                    : "Showing 0 entries"}
            </span>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    style={{ ...inter, fontWeight: 500, fontSize: "11.5px" }}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center transition cursor-pointer ${
                            currentPage === p
                                ? "bg-violet-600 text-white shadow-xs font-semibold"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={{ ...inter, fontWeight: 500, fontSize: "11.5px" }}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                    style={{ ...inter, fontWeight: 500, fontSize: "11.5px" }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
