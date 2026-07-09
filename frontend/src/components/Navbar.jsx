import { Link } from "react-router-dom";

function Navbar() {
  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md">
  <div className="w-full px-10 py-4 flex items-center">

    {/* Logo */}
    <Link
      to="/"
      className="text-3xl font-extrabold tracking-tight"
    >
      <span className="text-gray-900">Code</span>
      <span className="text-[#91F2E8]">Rewards</span>
    </Link>

    {/* Right Side */}
    <div className="ml-auto flex items-center gap-12">

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

        <Link
          to="/"
          className="hover:text-[#00BFA6] transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/problems"
          className="hover:text-[#00BFA6] transition duration-300"
        >
          Problems
        </Link>

        <Link
          to="/rewards"
          className="hover:text-[#00BFA6] transition duration-300"
        >
          Rewards
        </Link>

      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="px-5 py-2 rounded-full font-medium text-gray-700 hover:text-[#00BFA6] transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-2 rounded-full bg-[#91F2E8] text-gray-900 font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Register
        </Link>

      </div>

    </div>

  </div>
</nav>
  );
}

export default Navbar;