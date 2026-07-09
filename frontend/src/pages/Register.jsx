import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { confirmPassword, ...userData } = formData;

      const res = await registerUser(userData);

      toast.success(res.data.message || "Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed!"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-[420px]">

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#00A896] hover:text-[#028090] font-semibold mb-4 transition"
      >
        ← Back to Home
      </button>

      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:border-[#91F2E8]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:border-[#91F2E8]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:border-[#91F2E8]"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-6 outline-none focus:border-[#91F2E8]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#91F2E8] py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#00A896] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Register;