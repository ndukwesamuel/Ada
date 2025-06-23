import { useState } from "react";
import { Edit, XCircle } from "lucide-react";
import StatusBadge from "../utils/StatusBadge";
import { formatDate } from "@/helpers/formateDate";
import StatusUpdateModal from "./StatusUpdateModal";
export const ProductDetail = ({ product, onClose, mode }) => {
  if (!product) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleStatusUpdate = (productId, newStatus) => {
    setProducts(
      products.map((product) =>
        product._id === productId ? { ...product, status: newStatus } : product
      )
    );
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}

            {product.images && product.images.length > 1 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                Status: <StatusBadge status={product.status} />
              </p>
              <p className="text-gray-700 mb-2">
                Price:{" "}
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-700 mb-2">
                Seller:{" "}
                <span className="font-semibold">{product.seller.name}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Contact:{" "}
                <span className="font-semibold">{product.contact}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Listed on:{" "}
                <span className="font-semibold">
                  {formatDate(product.createdAt)}
                </span>
              </p>
              <p className="text-gray-700 mb-2">
                Last updated:{" "}
                <span className="font-semibold">
                  {formatDate(product.updatedAt)}
                </span>
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {mode !== "superadmin" && (
              <div className="mt-6">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 flex items-center"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                    //   onClose();
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <StatusUpdateModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};
