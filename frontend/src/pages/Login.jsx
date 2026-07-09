import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      toast.success(res.data.message || "Login Successful!");

      // Store JWT Token
      localStorage.setItem("token", res.data.token);

      // Store User (Optional)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
  if (res.data.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/dashboard");
  }
}, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[420px]"
      >

        <h2 className="text-3xl font-bold text-center mb-8">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:border-[#91F2E8]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-6 outline-none focus:border-[#91F2E8]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#91F2E8] py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging In...." : "Login"}
        </button>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#00A896] font-semibold"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;