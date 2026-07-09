import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAllRedeems,
  sendReward,
} from "../../../services/adminService";

function Redeems() {
  const navigate = useNavigate();

  const [redeems, setRedeems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedRedeem, setSelectedRedeem] = useState(null);
  const [giftCode, setGiftCode] = useState("");

  useEffect(() => {
    fetchRedeems();
  }, []);

  // ================= Fetch Redeems =================

  const fetchRedeems = async () => {
    try {
      setLoading(true);

      const res = await getAllRedeems();

      console.log(res.data);

      setRedeems(res.data.redeem || []);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load redeem requests"
      );

      setRedeems([]);

    } finally {
      setLoading(false);
    }
  };

  // ================= Open Modal =================

  const openModal = (redeem) => {
    setSelectedRedeem(redeem);
    setGiftCode(redeem.code || "");
    setShowModal(true);
  };

  // ================= Close Modal =================

  const closeModal = () => {
    setShowModal(false);
    setSelectedRedeem(null);
    setGiftCode("");
  };

  // ================= Send Reward =================

  const handleSendReward = async () => {
    if (!giftCode.trim()) {
      return toast.error("Please enter Gift Card Code");
    }

    try {
      const res = await sendReward({
        redeemId: selectedRedeem._id,
        code: giftCode,
      });

      toast.success(
        res.data.message || "Reward Sent Successfully"
      );

      closeModal();

      fetchRedeems();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send reward"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= Header ================= */}

      <div className="bg-white shadow-sm">

        <div className="px-8 py-6 flex justify-between items-center">

          <div>

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-[#00A896] font-medium mb-2 hover:text-[#00897B]"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-4xl font-bold">
              Reward Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage reward redemption requests.
            </p>

          </div>

          <div className="bg-[#91F2E8] rounded-xl px-8 py-5 shadow">

            <p className="text-gray-600">
              Total Requests
            </p>

            <h2 className="text-4xl font-bold text-[#00A896]">
              {redeems.length}
            </h2>

          </div>

        </div>

      </div>

      {/* ================= Content ================= */}

      <div className="p-8">

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (

            <div className="text-center py-20 text-lg">
              Loading Redeem Requests...
            </div>

          ) : redeems.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold">
                No Redeem Requests
              </h2>

              <p className="text-gray-500 mt-2">
                Users haven't redeemed any rewards yet.
              </p>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    User
                  </th>

                  <th className="text-left">
                    Email
                  </th>

                  <th className="text-left">
                    Available Points
                  </th>

                  <th className="text-left">
                    Reward
                  </th>

                  <th className="text-left">
                    Amount
                  </th>

                  <th className="text-left">
                    Required Points
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Requested On
                  </th>

                  <th className="text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                                {redeems.map((redeem) => (

                  <tr
                    key={redeem._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-medium">
                      {redeem.userId?.name}
                    </td>

                    <td>
                      {redeem.userId?.email}
                    </td>

                    <td>
                      <span className="font-semibold text-[#00A896]">
                        {redeem.userId?.availablePoints}
                      </span>
                    </td>

                    <td>
                      {redeem.rewardId?.title}
                    </td>

                    <td>
                      ₹{redeem.rewardId?.amount}
                    </td>

                    <td>
                      {redeem.rewardId?.pointsRequired}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          redeem.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : redeem.status === "Sent"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {redeem.status}
                      </span>

                    </td>

                    <td>
                      {new Date(redeem.createdAt).toLocaleDateString()}
                    </td>

                    <td className="text-center">

                      {redeem.status === "Pending" ? (

                        <button
                          onClick={() => openModal(redeem)}
                          className="bg-[#91F2E8] hover:bg-cyan-300 transition px-4 py-2 rounded-lg font-medium"
                        >
                          Send Reward
                        </button>

                      ) : (

                        <button
                          disabled
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                        >
                          Sent
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ================= Send Reward Modal ================= */}

      {showModal && selectedRedeem && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[520px] rounded-xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Send Reward
            </h2>

            <div className="space-y-3">

              <p>
                <strong>User :</strong>{" "}
                {selectedRedeem.userId?.name}
              </p>

              <p>
                <strong>Email :</strong>{" "}
                {selectedRedeem.userId?.email}
              </p>

              <p>
                <strong>Reward :</strong>{" "}
                {selectedRedeem.rewardId?.title}
              </p>

              <p>
                <strong>Gift Card :</strong>{" "}
                {selectedRedeem.rewardId?.rewardType}
              </p>

              <p>
                <strong>Amount :</strong>{" "}
                ₹{selectedRedeem.rewardId?.amount}
              </p>

              <p>
                <strong>Required Points :</strong>{" "}
                {selectedRedeem.rewardId?.pointsRequired}
              </p>

            </div>

            <div className="mt-6">

              <label className="block mb-2 font-medium">
                Gift Card Code
              </label>

              <input
                type="text"
                placeholder="Enter Gift Card Code"
                value={giftCode}
                onChange={(e) =>
                  setGiftCode(e.target.value)
                }
                className="w-full border rounded-lg p-3 outline-none focus:border-[#00A896]"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={closeModal}
                className="px-6 py-3 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleSendReward}
                className="bg-[#00A896] hover:bg-[#00897B] text-white px-6 py-3 rounded-lg font-semibold"
              >
                Send Reward
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Redeems;