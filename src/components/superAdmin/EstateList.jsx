import { useState, useEffect } from "react";
import { useFetchData } from "@/hook/Request";
import EstateProductViewer from "./EstateProductViewer";
import { Info } from "lucide-react";
import Pagination from "../Pagination";

export default function EstateList() {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useFetchData(
    `/v1/admin/market-place?page=${currentPage}`,
    ["estates", currentPage]
  );

  const estates = data?.data || [];
  const pagination = data?.pagination || {};

  if (selectedEstate) {
    return (
      <EstateProductViewer
        estate={selectedEstate}
        onBack={() => setSelectedEstate(null)}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-500">
          All Estates
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading estates. Please try again later.
          </div>
        ) : estates.length === 0 ? (
          <div className="text-center text-gray-500">No estates found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {estates.map((estate) => (
                <div
                  key={estate._id}
                  className="bg-white rounded-lg shadow p-4 border"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {estate.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Products: {estate.productCount || 0}
                  </p>
                  <button
                    onClick={() => setSelectedEstate(estate)}
                    className="flex items-center text-sm text-green-500 hover:underline"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    View Products
                  </button>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
