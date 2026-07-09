import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteProblem } from "../../../services/adminService";

function DeleteProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteProblem(id);

      toast.success(
        res.data.message || "Problem Deleted Successfully"
      );

      navigate("/admin/problems");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete problem"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-lg p-10 w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-4">
          Delete Problem
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Are you sure you want to delete this problem?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-5">

          <button
            onClick={() => navigate("/admin/problems")}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteProblem;