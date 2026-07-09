import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllUsers } from "../../../services/adminService";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();

      // Backend returns { success, totalUsers, users }
      setUsers(res.data.users || []);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load users"
      );

      setUsers([]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-white shadow-sm">

        <div className="px-8 py-6 flex justify-between items-center">

          <div>

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-[#00A896] hover:text-[#00897B] font-medium mb-2"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-4xl font-bold">
              User Management
            </h1>

            <p className="text-gray-500 mt-1">
              View all registered users.
            </p>

          </div>

          <div className="bg-[#91F2E8] px-6 py-3 rounded-xl">

            <p className="text-sm text-gray-600">
              Total Users
            </p>

            <h2 className="text-2xl font-bold">
              {users.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="p-8">

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (

            <div className="py-20 text-center text-lg">
              Loading Users...
            </div>

          ) : users.length === 0 ? (

            <div className="py-20 text-center">

              <h2 className="text-2xl font-semibold">
                No Users Found
              </h2>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-5 text-left">
                    Name
                  </th>

                  <th className="text-left">
                    Email
                  </th>

                  <th className="text-left">
                    Role
                  </th>

                  <th className="text-left">
                    Total Points
                  </th>

                  <th className="text-left">
                    Available Points
                  </th>

                  <th className="text-left">
                    Joined
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-5 font-medium">
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>
                      {user.totalPoints}
                    </td>

                    <td>
                      {user.availablePoints}
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
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

export default Users;