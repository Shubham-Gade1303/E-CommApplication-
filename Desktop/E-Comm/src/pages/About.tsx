const About = () => {
  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Products" },
    { value: "50+", label: "Brands" },
    { value: "24/7", label: "Support" },
  ];

  const team = [
    { name: "Alice Johnson", role: "CEO & Founder", emoji: "👩‍💼" },
    { name: "Bob Smith", role: "Head of Products", emoji: "👨‍💻" },
    { name: "Clara Lee", role: "Customer Success", emoji: "👩‍🎨" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl px-10 py-20 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About ShopEase</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          We are on a mission to make online shopping simple, affordable, and
          enjoyable for everyone.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <p className="text-3xl font-bold text-blue-600">{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="bg-white rounded-2xl shadow p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
        <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            ShopEase was founded in 2020 with a simple idea — make online
            shopping accessible to everyone. We started as a small team of 3
            people with a passion for great products and even better customer
            service.
          </p>
          <p>
            Today, we serve thousands of customers across the globe, offering
            a carefully curated selection of products across electronics,
            fashion, jewelry, and more. Every product on our platform is
            handpicked for quality and value.
          </p>
          <p>
            We believe shopping should be fun, easy, and trustworthy. That's
            why we offer free returns, secure payments, and 24/7 customer
            support on every order.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🛡️",
              title: "Trust & Safety",
              desc: "Every transaction is secure and every product is verified for quality.",
            },
            {
              icon: "💚",
              title: "Customer First",
              desc: "We put our customers at the heart of every decision we make.",
            },
            {
              icon: "🚀",
              title: "Innovation",
              desc: "We constantly improve our platform to give you the best experience.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow p-6">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map(({ name, role, emoji }) => (
            <div
              key={name}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <div className="text-5xl mb-3">{emoji}</div>
              <h3 className="font-bold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">{role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;