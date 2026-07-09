import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProblemById,
  updateProblem,
} from "../../../services/adminService";

function UpdateProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    statement: "",
    difficulty: "Easy",
    category: "",
    points: "",
    timeLimit: "",
    maxAttempts: "",
  });

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    try {
      setLoading(true);

      const res = await getProblemById(id);

      const problem = res.data.problem;

      setFormData({
        title: problem.title || "",
        statement: problem.statement || "",
        difficulty: problem.difficulty || "Easy",
        category: problem.category || "",
        points: problem.points || "",
        timeLimit: problem.timeLimit || "",
        maxAttempts: problem.maxAttempts || "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch problem"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      return toast.error("Please select a category");
    }

    try {
      setLoading(true);

      const res = await updateProblem(id, formData);

      toast.success(
        res.data.message || "Problem Updated Successfully"
      );

      navigate("/admin/problems");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update problem"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white shadow-sm px-8 py-6">

        <button
          onClick={() => navigate("/admin/problems")}
          className="text-[#00A896] font-medium hover:underline mb-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          Update Problem
        </h1>

      </div>

      <div className="p-8">

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Problem Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              rows="8"
              name="statement"
              placeholder="Problem Statement"
              value={formData.statement}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <div className="grid grid-cols-2 gap-5">

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="border rounded-lg p-3"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Change these options to exactly match your enum values */}
              <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="border rounded-lg p-3"
  required
>
  <option value="">Select Category</option>

  <option value="Arrays">Arrays</option>
  <option value="Strings">Strings</option>
  <option value="Math">Math</option>
  <option value="Simulation">Simulation</option>
  <option value="Searching">Searching</option>
  <option value="Sorting">Sorting</option>
  <option value="Recursion">Recursion</option>
  <option value="Greedy">Greedy</option>
  <option value="Dynamic Programming">
    Dynamic Programming
  </option>
  <option value="Graphs">Graphs</option>
  <option value="Trees">Trees</option>
  <option value="College">College</option>
  <option value="Finance">Finance</option>
  <option value="Games">Games</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Scheduling">Scheduling</option>
  <option value="Custom">Custom</option>
</select>

            </div>

            <div className="grid grid-cols-3 gap-5">

              <input
                type="number"
                name="points"
                placeholder="Points"
                value={formData.points}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="timeLimit"
                placeholder="Time Limits"
                value={formData.timeLimit}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="maxAttempts"
                placeholder="Max Attempts"
                value={formData.maxAttempts}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#91F2E8] py-3 rounded-lg font-semibold hover:opacity-90"
            >
              {loading ? "Updating..." : "Update Problem"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default UpdateProblem;