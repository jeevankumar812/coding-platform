import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPendingSubmissions } from "../../../services/adminService";

function PendingSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await getPendingSubmissions();

      setSubmissions(res.data.submissions || []);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load submissions"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Pending Submissions
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">User</th>
              <th className="text-left">Problem</th>
              <th className="text-left">Language</th>
              <th className="text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {submissions.map((submission) => (

              <tr key={submission._id} className="border-t">

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
                  {submission.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PendingSubmissions;