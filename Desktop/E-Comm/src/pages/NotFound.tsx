import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
      <div className="text-5xl mb-6">😕</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;