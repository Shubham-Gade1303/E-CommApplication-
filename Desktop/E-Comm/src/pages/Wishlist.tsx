import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🤍</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Save products you love by clicking the heart icon
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Wishlist
          <span className="text-lg font-normal text-gray-500 ml-2">
            ({wishlist.length} items)
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            {/* Image */}
            <Link to={`/products/${product.id}`}>
              <div className="h-48 flex items-center justify-center p-4 bg-gray-50 rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>
            </Link>

            {/* Details */}
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs text-blue-500 uppercase font-semibold">
                {product.category}
              </span>
              <Link to={`/products/${product.id}`}>
                <h3 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 hover:text-blue-600">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-sm text-gray-500">
                  {product.rating.rate}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {formatPrice(product.price)}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;