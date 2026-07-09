import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= Header ================= */}

      <header className="bg-white shadow-sm ">

        <div className="w-full px-10 py-6 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Coding Platform Administration Panel
            </p>

          </div>

          <Link
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Logout
          </Link>

        </div>

      </header>

      {/* ================= Welcome ================= */}

      <section className="w-full px-10 mt-10">

        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-8 text-white shadow-lg">

          <h2 className="text-3xl font-bold">
            Welcome, Admin 👋
          </h2>

          <p className="mt-3 text-cyan-100 text-lg">
            Manage users, coding problems, submissions and reward requests
            from one dashboard.
          </p>

        </div>

      </section>

      {/* ================= Quick Stats ================= */}

      <section className="w-full px-10 mt-8">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Modules
            </p>

            <h2 className="text-4xl font-bold text-cyan-600 mt-2">
              4
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Platform
            </p>

            <h2 className="text-2xl font-bold mt-2">
              MERN Stack
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Role
            </p>

            <h2 className="text-2xl font-bold text-green-600 mt-2">
              Administrator
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Status
            </p>

            <h2 className="text-2xl font-bold text-green-500 mt-2">
              ● Online
            </h2>

          </div>

        </div>

      </section>

      {/* ================= Modules ================= */}

     <section className="w-full px-10 mt-10 pb-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Administration Modules
        </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">

          {/* Problems */}

          <Link
            to="/admin/problems"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 border-t-4 border-cyan-500"
          >
            <div className="text-5xl mb-5">
                📚
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Problems
            </h3>

            <p className="text-gray-600">
              Create, update and delete coding problems.
            </p>

          </Link>

          {/* Users */}

          <Link
            to="/admin/users"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 border-t-4 border-blue-500"
          >
            <div className="text-5xl mb-5">
                👥
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Users
            </h3>

            <p className="text-gray-600">
              View and manage all registered users.
            </p>

          </Link>

          {/* Submissions */}

          <Link
            to="/admin/submissions"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 border-t-4 border-green-500"
          >
            <div className="text-5xl mb-5">
                💻
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Submissions
            </h3>

            <p className="text-gray-600">
              Review submitted solutions and approve or reject them.
            </p>

          </Link>

          {/* Redeems */}

          <Link
            to="/admin/redeems"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 border-t-4 border-yellow-500"
          >
            <div className="text-5xl mb-5">
                🎁
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Redeems
            </h3>

            <p className="text-gray-600">
              Manage reward redemption requests and send gift cards.
            </p>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;