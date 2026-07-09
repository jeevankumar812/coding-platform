import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllProblems } from "../../../services/adminService";

function Problems() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);

      const res = await getAllProblems();

      console.log(res.data);

      // Backend returns "problem"
      setProblems(res.data.problem || []);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load problems"
      );

      setProblems([]);

    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen bg-gray-100">

    {/* Header */}

    <div className="bg-white shadow-sm ">

     <div className="w-full px-8 py-6 flex justify-between items-center">

        <div>

<button
  onClick={() => navigate("/admin/dashboard")}
  className="inline-flex items-center gap-2 text-[#00A896] hover:text-[#00897B] font-medium mb-2 transition"
>
  ← Back to Dashboard
</button>

          <h1 className="text-4xl font-bold">
            Problem Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage coding problems on your platform.
          </p>

        </div>

        <Link
          to="/admin/problems/create"
          className="bg-[#91F2E8] hover:bg-cyan-300 transition px-6 py-3 rounded-xl font-semibold shadow"
        >
          + Create Problem
        </Link>

      </div>

    </div>

    {/* Content */}

    <div className="w-full px-8 py-8">

      {/* Statistics */}

      <div className="bg-white rounded-xl shadow p-6 mb-8 flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            Total Problems
          </p>

          <h2 className="text-4xl font-bold text-[#00A896]">
            {problems.length}
          </h2>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="text-center py-16 text-lg">
            Loading Problems...
          </div>

        ) : problems.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold">
              No Problems Found
            </h2>

            <p className="text-gray-500 mt-2">
              Click "Create Problem" to add your first coding challenge.
            </p>

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-5">
                  Title
                </th>

                <th className="text-left">
                  Difficulty
                </th>

                <th className="text-left">
                  Category
                </th>

                <th className="text-left">
                  Points
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {problems.map((problem) => (

                <tr
                  key={problem._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-5 font-semibold">
                    {problem.title}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          problem.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {problem.difficulty}
                    </span>

                  </td>

                  <td>{problem.category}</td>

                  <td>

                    <span className="font-bold text-[#00A896]">
                      {problem.points}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/problems/update/${problem._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 rounded-lg font-medium"
                      >
                        Update
                      </Link>

                      <Link
                        to={`/admin/problems/delete/${problem._id}`}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Delete
                      </Link>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  </div>
);
}

export default Problems;