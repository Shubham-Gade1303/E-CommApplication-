import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types/index";
import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../component/product/ProductCard";
import Loader from "../component/UI/Loader";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<number>(1000);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allProducts, allCategories] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const data =
          selectedCategory === "all"
            ? await getAllProducts()
            : await getProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch by category", error);
      } finally {
        setLoading(false);
      }
    };
    fetchByCategory();
  }, [selectedCategory]);

  // Filter by search and price
  let filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= priceRange
  );

  // Sort
  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating.rate - a.rating.rate);
  else if (sortBy === "name") filtered.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <p className="text-gray-500 mt-1">
          {filtered.length} products found
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24 space-y-6">

            {/* Search */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Search</h3>
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <input
                id="product-search"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`text-sm w-full text-left px-3 py-2 rounded-lg capitalize ${
                      selectedCategory === "all"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    All
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm w-full text-left px-3 py-2 rounded-lg capitalize ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Max Price:{" "}
                <span className="text-blue-600">${priceRange}</span>
              </h3>
              <label htmlFor="price-range" className="sr-only">
                Filter products by maximum price
              </label>
              <input
                id="price-range"
                type="range"
                min={0}
                max={1000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSortBy("default");
                setPriceRange(1000);
              }}
              className="w-full bg-red-50 text-red-500 border border-red-200 rounded-lg py-2 text-sm hover:bg-red-100 transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow px-4 py-3">
            <span className="text-sm text-gray-500">
              Showing {filtered.length} results
            </span>
            <label htmlFor="sort-products" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <Loader />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">😕</p>
              <p className="text-gray-500 text-lg">No products found</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setPriceRange(1000);
                }}
                className="mt-4 text-blue-600 hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;