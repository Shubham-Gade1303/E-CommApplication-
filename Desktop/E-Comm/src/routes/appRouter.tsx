import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;