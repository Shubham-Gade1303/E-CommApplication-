import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Product } from "../types/index";
import type { Product } from "../types/index";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../component/UI/Loader";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate("/cart");
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Product not found</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  // Star rating display
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(product.rating.rate)) return "⭐";
    return "☆";
  });

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Product Image */}
          <div className="w-full md:w-96 flex items-center justify-center bg-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Category */}
            <span className="text-sm text-blue-500 uppercase font-semibold tracking-wide">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {stars.map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                {product.rating.rate} out of 5 ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {added ? "✅ Added to Cart!" : "🛒 Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={() =>
                  wishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className={`px-6 py-3 rounded-xl font-semibold border transition ${
                  wishlisted
                    ? "border-red-400 text-red-500 hover:bg-red-50"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {wishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-4 border-t pt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔄</span>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span>1 year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>In stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">
                {product.rating.rate}
              </div>
              <div className="flex text-yellow-400 mt-1">
                {stars.map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {product.rating.count} reviews
              </div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-500 w-4">{star}⭐</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${star === Math.round(product.rating.rate) ? 60 : Math.random() * 40}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;