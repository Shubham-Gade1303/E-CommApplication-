import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep1 = () => {
    const newErrors: Partial<ShippingForm> = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.zipcode) newErrors.zipcode = "Zipcode is required";
    if (!form.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate("/order-success", {
        state: {
          orderNumber: `ORD-${Date.now()}`,
          items,
          total: totalPrice + (totalPrice > 50 ? 0 : 5.99) + totalPrice * 0.1,
          address: form,
          paymentMethod,
        },
      });
    }, 1500);
  };

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-10">
        {["Shipping", "Payment", "Review"].map((label, index) => {
          const stepNum = index + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;
          return (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isDone ? "✓" : stepNum}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`w-24 h-1 mx-2 mb-4 rounded ${
                    step > stepNum ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Steps */}
        <div className="flex-1">

          {/* Step 1 - Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                🚚 Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "fullName", label: "Full Name", placeholder: "John Doe" },
                  { name: "email", label: "Email", placeholder: "john@email.com" },
                  { name: "phone", label: "Phone", placeholder: "+1 234 567 8900" },
                  { name: "address", label: "Street Address", placeholder: "123 Main St" },
                  { name: "city", label: "City", placeholder: "New York" },
                  { name: "state", label: "State", placeholder: "NY" },
                  { name: "zipcode", label: "Zipcode", placeholder: "10001" },
                  { name: "country", label: "Country", placeholder: "United States" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={form[name as keyof ShippingForm]}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
                        errors[name as keyof ShippingForm]
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[name as keyof ShippingForm] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[name as keyof ShippingForm]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Payment */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                💳 Payment Method
              </h2>
              <div className="space-y-4">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: "💳" },
                  { id: "paypal", label: "PayPal", icon: "🅿️" },
                  { id: "cod", label: "Cash on Delivery", icon: "💵" },
                ].map(({ id, label, icon }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition ${
                      paymentMethod === id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="accent-blue-600"
                    />
                    <span className="text-2xl">{icon}</span>
                    <span className="font-medium text-gray-700">{label}</span>
                  </label>
                ))}

                {/* Card details */}
                {paymentMethod === "card" && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Review */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                📋 Review Order
              </h2>

              {/* Shipping Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">{form.fullName}</p>
                  <p>{form.address}</p>
                  <p>{form.city}, {form.state} {form.zipcode}</p>
                  <p>{form.country}</p>
                  <p>{form.email} | {form.phone}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Payment Method
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 capitalize">
                  {paymentMethod === "card"
                    ? "💳 Credit / Debit Card"
                    : paymentMethod === "paypal"
                    ? "🅿️ PayPal"
                    : "💵 Cash on Delivery"}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Items</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-blue-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Placing Order..." : "✅ Place Order"}
              </button>
            )}
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
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
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;