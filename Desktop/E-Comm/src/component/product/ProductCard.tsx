import { Link } from "react-router-dom";
import type { Product } from "../../types/index";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="h-52 flex items-center justify-center p-4 bg-gray-50 rounded-t-xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <span className="text-xs text-blue-500 uppercase font-semibold">
          {product.category}
        </span>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-sm text-gray-500">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-2">
            {/* Wishlist */}
            <button
              onClick={() =>
                wishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              className="text-xl"
              title="Wishlist"
            >
              {wishlisted ? "❤️" : "🤍"}
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            >
              + Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;