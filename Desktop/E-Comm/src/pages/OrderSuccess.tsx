import { useLocation, Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No order found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">
          Go Home
        </Link>
      </div>
    );
  }

  const { orderNumber, items, total, address, paymentMethod } = state;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center py-10 bg-white rounded-2xl shadow mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500">
          Thank you for shopping with ShopEase
        </p>
        <div className="mt-4 inline-block bg-green-50 border border-green-200 rounded-xl px-6 py-3">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="text-lg font-bold text-green-700">{orderNumber}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Details</h2>
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-contain bg-gray-50 rounded-lg p-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-blue-600">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total Paid</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Shipping & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-gray-800 mb-3">📦 Shipping To</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-800">{address.fullName}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state} {address.zipcode}</p>
            <p>{address.country}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-gray-800 mb-3">💳 Payment</h3>
          <p className="text-sm text-gray-600 capitalize">
            {paymentMethod === "card"
              ? "💳 Credit / Debit Card"
              : paymentMethod === "paypal"
              ? "🅿️ PayPal"
              : "💵 Cash on Delivery"}
          </p>
          <div className="mt-3 inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
            ✅ Confirmed
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-center"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;