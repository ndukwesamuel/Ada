import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useFetchData } from "@/hook/Request";
import { formatDate } from "@/helpers/formateDate";
import { ProductDetail } from "@/components/estateAdmin/ProductDetails";
import StatusBadge from "../utils/StatusBadge";

export default function EstateProductViewer({ estate, onBack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, isLoading, isError } = useFetchData(
    `/v1/admin/${estate.clanId}/products?page=${currentPage}&limit=10`,
    ["products", estate.clanId, currentPage]
  );

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 text-green-500 hover:underline"
        >
          ← Back to Estates
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-500">
          Products in {estate.name}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading products. Please try again later.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0].url}
                            alt=""
                            className="w-10 h-10 rounded object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            No Img
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.seller.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        #{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-green-500"
                          title="View Details"
                        >
                          <Info className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          mode="superadmin"
        />
      )}
    </div>
  );
}
