import { useState } from "react";
import toast from "react-hot-toast";

import { rejectSubmission } from "../../../services/adminService";

function RejectSubmission() {
  const [submissionId, setSubmissionId] = useState("");

  const handleReject = async () => {
    try {
      const res = await rejectSubmission(submissionId);

      toast.success(
        res.data.message || "Submission Rejected"
      );

      setSubmissionId("");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to reject submission"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-[450px]">

        <h1 className="text-3xl font-bold mb-6">
          Reject Submission
        </h1>

        <input
          type="text"
          placeholder="Submission ID"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          onClick={handleReject}
          className="w-full bg-red-500 text-white py-3 rounded-lg"
        >
          Reject
        </button>

      </div>

    </div>
  );
}

export default RejectSubmission;