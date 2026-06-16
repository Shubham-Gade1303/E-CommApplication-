import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<RegisterForm> = {};
    if (!form.firstname) newErrors.firstname = "First name is required";
    if (!form.lastname) newErrors.lastname = "Last name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // FakeStore API register endpoint
      await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
          name: {
            firstname: form.firstname,
            lastname: form.lastname,
          },
          phone: form.phone,
        }),
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const fields = [
    { name: "firstname", label: "First Name", placeholder: "John", col: 1 },
    { name: "lastname", label: "Last Name", placeholder: "Doe", col: 1 },
    { name: "email", label: "Email", placeholder: "john@email.com", col: 2 },
    { name: "username", label: "Username", placeholder: "johndoe123", col: 1 },
    { name: "phone", label: "Phone", placeholder: "+1 234 567 8900", col: 1 },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join ShopEase today</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ name, label, placeholder, col }) => (
            <div key={name} className={col === 2 ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                placeholder={placeholder}
                value={form[name as keyof RegisterForm]}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 ${
                  errors[name as keyof RegisterForm]
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
              {errors[name as keyof RegisterForm] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name as keyof RegisterForm]}
                </p>
              )}
            </div>
          ))}

          {/* Password */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 pr-12 ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Account..." : "Create Account →"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;