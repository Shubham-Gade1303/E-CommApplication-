import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/index";
import { getAllProducts, getAllCategories } from "../services/productService";
import ProductCard from "../component/product/ProductCard";
import Loader from "../component/UI/Loader";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl px-10 py-20 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Shop the Latest Trends
        </h1>
        <p className="text-lg text-blue-100 mb-8">
          Discover top products at unbeatable prices
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition"
        >
          Shop Now →
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center capitalize font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow transition"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-blue-600 font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Offers Banner */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-2xl px-10 py-12 text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-700 mb-3">
          🔥 Latest Offers
        </h2>
        <p className="text-yellow-600 mb-6">
          Up to 50% off on selected items. Limited time only!
        </p>
        <Link
          to="/products"
          className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-yellow-600 transition"
        >
          Grab the Deal →
        </Link>
      </section>
    </div>
  );
};

export default Home;