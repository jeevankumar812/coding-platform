import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createProblem } from "../../../services/adminService";

function CreateProblem() {
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

      const res = await createProblem(formData);

      toast.success(
        res.data.message || "Problem Created Successfully"
      );

      setFormData({
        title: "",
        statement: "",
        difficulty: "Easy",
        category: "",
        points: "",
        timeLimit: "",
        maxAttempts: "",
      });

      navigate("/admin/problems");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create problem"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gray-100">

    {/* Header */}

    <div className="bg-white px-8 py-6 shadow-sm">

      <button
        onClick={() => navigate("/admin/problems")}
        className="text-[#00A896] hover:underline font-medium mb-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-gray-900">
        Create Problem
      </h1>

      <p className="text-gray-500 mt-1">
        Add a new coding problem to your platform.
      </p>

    </div>

    {/* Form */}

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
            className="w-full border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
            required
          />

          <textarea
            name="statement"
            rows="8"
            placeholder="Problem Statement"
            value={formData.statement}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
            required
          />

          <div className="grid grid-cols-2 gap-5">

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

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
              className="border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
              required
            />

            <input
              type="number"
              name="timeLimit"
              placeholder="Time Limit"
              value={formData.timeLimit}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
              required
            />

            <input
              type="number"
              name="maxAttempts"
              placeholder="Max Attempts"
              value={formData.maxAttempts}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:border-[#91F2E8]"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#91F2E8] hover:bg-[#7DE9DD] py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating..." : "Create Problem"}
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default CreateProblem;