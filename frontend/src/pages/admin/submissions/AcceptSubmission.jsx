import { useState } from "react";
import toast from "react-hot-toast";

import { acceptSubmission } from "../../../services/adminService";

function AcceptSubmission() {
  const [submissionId, setSubmissionId] = useState("");

  const handleAccept = async () => {
    try {
      const res = await acceptSubmission(submissionId);

      toast.success(
        res.data.message || "Submission Accepted"
      );

      setSubmissionId("");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to accept submission"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-[450px]">

        <h1 className="text-3xl font-bold mb-6">
          Accept Submission
        </h1>

        <input
          type="text"
          placeholder="Submission ID"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          onClick={handleAccept}
          className="w-full bg-green-500 text-white py-3 rounded-lg"
        >
          Accept
        </button>

      </div>

    </div>
  );
}

export default AcceptSubmission;