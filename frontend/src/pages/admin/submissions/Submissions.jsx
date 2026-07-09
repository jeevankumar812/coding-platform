import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getPendingSubmissions,
  acceptSubmission,
  rejectSubmission,
} from "../../../services/adminService";

function Submissions() {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const res = await getPendingSubmissions();

      setSubmissions(res.data.submissions || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load submissions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await acceptSubmission(id);

      toast.success(
        res.data.message || "Submission Accepted"
      );

      fetchSubmissions();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to accept submission"
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await rejectSubmission(id);

      toast.success(
        res.data.message || "Submission Rejected"
      );

      fetchSubmissions();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject submission"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-white shadow-sm">

        <div className="px-8 py-6">

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-[#00A896] hover:text-[#00897B] font-medium mb-2"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-4xl font-bold">
            Submission Management
          </h1>

          <p className="text-gray-500 mt-1">
            Review and manage pending submissions.
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <p className="text-gray-500">
            Pending Submissions
          </p>

          <h2 className="text-4xl font-bold text-[#00A896]">
            {submissions.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (

            <div className="text-center py-16">
              Loading...
            </div>

          ) : submissions.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold">
                No Pending Submissions
              </h2>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    User
                  </th>

                  <th className="text-left">
                    Problem
                  </th>

                  <th className="text-left">
                    Language
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {submissions.map((submission) => (

                  <tr
                    key={submission._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {submission.userId?.name}
                    </td>

                    <td>
                      {submission.problemId?.title}
                    </td>

                    <td>
                      {submission.language}
                    </td>

                    <td>

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        {submission.status}

                      </span>

                    </td>

<td>
  <div className="flex justify-center gap-2">

    <button
      onClick={() => setSelectedCode(submission.code)}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      View Code
    </button>

    <button
      onClick={() => handleAccept(submission._id)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Accept
    </button>

    <button
      onClick={() => handleReject(submission._id)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Reject
    </button>

  </div>
</td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

 {selectedCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[900px] max-h-[85vh] rounded-xl shadow-xl overflow-hidden">

            <div className="flex justify-between items-center px-6 py-4 border-b">

              <h2 className="text-2xl font-bold">
                Submitted Code
              </h2>

              <button
                onClick={() => setSelectedCode("")}
                className="text-red-500 text-2xl font-bold hover:text-red-700"
              >
                ✕
              </button>

            </div>

            <div className="p-6 overflow-auto max-h-[70vh]">

              <pre className="bg-gray-900 text-green-400 rounded-lg p-5 overflow-x-auto">
                <code>{selectedCode}</code>
              </pre>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Submissions;