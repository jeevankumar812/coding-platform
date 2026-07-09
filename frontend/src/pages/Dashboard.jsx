import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="px-10 py-8">

        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Ready to solve today's coding challenges?
        </p>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Total Points
            </h2>

            <p className="text-4xl font-bold text-[#91F2E8] mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Solved Problems
            </h2>

            <p className="text-4xl font-bold text-[#91F2E8] mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Available Rewards
            </h2>

            <p className="text-4xl font-bold text-[#91F2E8] mt-3">
              ₹0
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 flex gap-5">

          <Link
            to="/problems"
            className="bg-[#91F2E8] px-6 py-3 rounded-xl font-semibold"
          >
            Solve Problems
          </Link>

          <Link
            to="/rewards"
            className="border-2 border-[#91F2E8] px-6 py-3 rounded-xl font-semibold"
          >
            View Rewards
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;