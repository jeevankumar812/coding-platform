import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm px-10 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/"
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </Link>

      </div>

      {/* Welcome */}

      <div className="px-10 mt-8">

        <h2 className="text-2xl font-semibold">
          Welcome Admin 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Manage your coding platform from one place.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 mt-10">

        {/* Problems */}

        <Link
          to="/admin/problems"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            📚 Problems
          </h2>

          <p className="text-gray-600">
            Create, update and delete coding problems.
          </p>

        </Link>

        {/* Users */}

        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            👥 Users
          </h2>

          <p className="text-gray-600">
            View all registered users.
          </p>

        </Link>

        {/* Pending Submissions */}

        <Link
          to="/admin/pending-submissions"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            💻 Pending Submissions
          </h2>

          <p className="text-gray-600">
            Review and verify submitted solutions.
          </p>

        </Link>

        {/* Redeems */}

        <Link
          to="/admin/redeems"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            🎁 Redeem Requests
          </h2>

          <p className="text-gray-600">
            View users' reward redemption requests.
          </p>

        </Link>

        {/* Send Reward */}

        <Link
          to="/admin/send-reward"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            💳 Send Reward
          </h2>

          <p className="text-gray-600">
            Send gift card codes to users.
          </p>

        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;