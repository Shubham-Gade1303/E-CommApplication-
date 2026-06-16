import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Shopping Cart
          <span className="text-lg font-normal text-gray-500 ml-2">
            ({items.length} items)
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 flex gap-4 items-center"
            >
              {/* Image */}
              <Link to={`/products/${item.id}`}>
                <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-blue-600">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-blue-500 capitalize mt-1">
                  {item.category}
                </p>
                <p className="text-blue-600 font-bold mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shrink-0">
                <button
                  onClick={() =>
                    item.quantity === 1
                      ? removeFromCart(item.id)
                      : updateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-800">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            {/* Item breakdown */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1 flex-1 mr-2">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="font-medium shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">
                  {totalPrice > 50 ? "Free" : formatPrice(5.99)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">
                  {formatPrice(totalPrice * 0.1)}
                </span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  {formatPrice(
                    totalPrice +
                      (totalPrice > 50 ? 0 : 5.99) +
                      totalPrice * 0.1
                  )}
                </span>
              </div>
              {totalPrice < 50 && (
                <p className="text-xs text-gray-500 mt-2">
                  Add {formatPrice(50 - totalPrice)} more for free shipping!
                </p>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Checkout →
            </button>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="block text-center text-sm text-blue-600 hover:underline mt-4"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;