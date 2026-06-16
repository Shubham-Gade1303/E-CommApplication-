import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Badge from "../UI/Badge";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            <Badge count={totalItems} />
          </Link>

          {/* Wishlist */}
          {isLoggedIn && (
            <Link to="/wishlist" className="text-2xl">❤️</Link>
          )}

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-2xl">👤</Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;