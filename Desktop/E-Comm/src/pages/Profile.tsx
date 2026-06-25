import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../component/UI/Loader";

const Profile = () => {
  const { isLoggedIn, logout } = useAuth();
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // FakeStore API user (demo)
  const [user] = useState({
    name: { firstname: "John", lastname: "Doe" },
    email: "john@fakestoreapi.com",
    username: "mor_2314",
    phone: "1-570-236-7033",
    address: {
      city: "kilcoole",
      street: "7835 new road",
      zipcode: "12926-3874",
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setTimeout(() => setLoading(false), 800);
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left - Avatar & Quick Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              👤
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {user.name.firstname} {user.name.lastname}
            </h2>
            <p className="text-gray-500 text-sm mt-1">@{user.username}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>📧 {user.email}</p>
              <p>📞 {user.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right - Details */}
        <div className="md:col-span-2 space-y-6">

          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: user.name.firstname },
                { label: "Last Name", value: user.name.lastname },
                { label: "Email", value: user.email },
                { label: "Username", value: user.username },
                { label: "Phone", value: user.phone },
                {
                  label: "Address",
                  value: `${user.address.street}, ${user.address.city}`,
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-gray-800 font-medium mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Cart Summary
            </h3>
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
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
                {items.length > 3 && (
                  <p className="text-xs text-gray-500">
                    +{items.length - 3} more items
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Cart Items", value: items.length, icon: "🛒" },
              { label: "Cart Total", value: formatPrice(totalPrice), icon: "💰" },
              { label: "Member Since", value: "2024", icon: "📅" },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow p-4 text-center"
              >
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-lg font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;