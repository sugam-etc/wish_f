import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import itemService from "../../api/itemService";
import { BACKEND_URL } from "../../config/backend";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await itemService.getItem(id);
        const itemsData = await itemService.getItems();
        setItems(itemsData.data);
        console.log("t", items);
        setItem(data.data);
        console.log(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log(`Added ${quantity} of ${item.name} to cart`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading item details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Item Not Found
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate("/store")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Store
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 p-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {item.image ? (
                  <img
                    src={`${BACKEND_URL}/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              {/* <div className="flex gap-2 overflow-x-auto pb-2">
                {[1, 2, 3].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-amber-500"
                        : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={`${BACKEND_URL}/${item.image}`}
                          alt={`${item.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>
                  </button>
                ))}
              </div> */}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 p-6">
              <div className="mb-4">
                {item.featured && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block">
                    Featured
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-serif font-light text-gray-900 mb-2">
                  {item.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (item.rating || 4)
                            ? "fill-current"
                            : "fill-none stroke-current"
                        }`}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    ({item.reviews || 12} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-medium text-gray-900 mb-4">
                  ${item.price?.toFixed(2)}
                </p>
                <p className="text-gray-700 mb-4">
                  {item.description || "No description available."}
                </p>
                <div className="flex items-center mb-4">
                  <span
                    className={`text-sm font-medium ${
                      item.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.stock > 0
                      ? `${item.stock} available in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md mr-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={item.stock <= 0 || quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/purchaseform", {
                        state: {
                          item: {
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            stock: item.stock,
                            image: `${BACKEND_URL}/${item.image}`,
                          },
                          quantity: quantity,
                        },
                      });
                    }}
                    disabled={item.stock <= 0}
                    className={`px-6 py-2 rounded-md font-medium ${
                      item.stock > 0
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {item.stock > 0 ? "Purchase Now" : "Out of Stock"}
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {item.category || "Uncategorized"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">SKU:</span>{" "}
                    {item._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="py-4 px-6 text-center border-b-2 font-medium text-sm border-amber-500 text-amber-600">
                Description
              </button>
            </nav>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {item.description ||
                  "No detailed description available for this product. Please contact us for more information about this item."}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-xl font-serif font-light text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items?.map((data) => (
              <div
                key={data._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/store/${data._id}`)}
              >
                <div className="aspect-square bg-gray-100">
                  {data.image ? (
                    <img
                      src={`${BACKEND_URL}/${data.image}`}
                      alt={`Related ${data.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {data.name}
                  </h3>
                  <p className="text-amber-600 text-sm font-medium">
                    ${data.price?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
