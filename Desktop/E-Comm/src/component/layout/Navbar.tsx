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
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-600 text-white shadow-lg">
            <i className="fa-solid fa-bag-shopping text-lg"></i>
          </span>
          <div className="leading-tight">
            <span className="block text-2xl font-bold">ShopEase</span>
            <span className="block text-xs font-medium text-slate-500">Smart shopping</span>
          </div>
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
          <Link to="/cart" className="relative text-2xl text-gray-700 hover:text-blue-600 transition">
            <i className="fa-solid fa-cart-shopping" />
            <Badge count={totalItems} />
          </Link>

          {/* Wishlist */}
          {isLoggedIn && (
            <Link to="/wishlist" className="text-2xl text-gray-700 hover:text-red-500 transition">
              <i className="fa-regular fa-heart" />
            </Link>
          )}

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-2xl text-gray-700 hover:text-blue-600 transition">
                <i className="fa-solid fa-user" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <i className="fa-solid fa-right-from-bracket mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              <i className="fa-solid fa-right-to-bracket mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;