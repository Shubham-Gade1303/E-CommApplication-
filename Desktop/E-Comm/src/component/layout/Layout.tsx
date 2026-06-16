import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;