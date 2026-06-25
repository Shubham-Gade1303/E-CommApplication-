import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        We'd love to hear from you. Send us a message!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            {
              icon: "📍",
              title: "Address",
              value: "123 ShopEase Lane, New York, NY 10001",
            },
            {
              icon: "📞",
              title: "Phone",
              value: "+1 (800) 123-4567",
            },
            {
              icon: "📧",
              title: "Email",
              value: "support@shopease.com",
            },
            {
              icon: "🕐",
              title: "Working Hours",
              value: "Mon - Fri: 9AM - 6PM",
            },
          ].map(({ icon, title, value }) => (
            <div key={title} className="bg-white rounded-2xl shadow p-5 flex gap-4">
              <div className="text-2xl">{icon}</div>
              <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500 mt-1">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Message Sent!
              </h2>
              <p className="text-gray-500">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Send a Message
              </h2>
              <div className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 ${
                        errors.name ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 ${
                        errors.email ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 ${
                      errors.subject ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none ${
                      errors.message ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Send Message →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;