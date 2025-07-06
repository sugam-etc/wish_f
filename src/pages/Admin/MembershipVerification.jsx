// components/admin/MembershipVerification.js
import React, { useState, useEffect } from "react";
import userService from "../../api/userService";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
const MembershipVerification = () => {
  const [pendingMemberships, setPendingMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationNotes, setVerificationNotes] = useState("");
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchPendingMemberships = async () => {
      try {
        const memberships = await userService.getPendingMemberships(user.token);
        setPendingMemberships(memberships);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchPendingMemberships();
    }
  }, [user]);

  const handleVerify = async (membershipId) => {
    try {
      await userService.verifyMembership(
        membershipId,
        verificationNotes,
        user.token
      );
      setPendingMemberships(
        pendingMemberships.filter((m) => m._id !== membershipId)
      );
      setVerificationNotes("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (membershipId) => {
    try {
      await userService.rejectMembership(
        membershipId,
        verificationNotes,
        user.token
      );
      setPendingMemberships(
        pendingMemberships.filter((m) => m._id !== membershipId)
      );
      setVerificationNotes("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Membership Verifications</h1>

      {pendingMemberships.length === 0 ? (
        <p>No pending memberships for verification</p>
      ) : (
        <div className="space-y-6">
          {pendingMemberships.map((membership) => (
            <div key={membership._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    {membership.userId?.fullName || "Unknown User"}
                  </h2>
                  <p className="text-gray-600">{membership.userId?.email}</p>
                  <div className="mt-2">
                    <p>
                      <span className="font-medium">Plan:</span>{" "}
                      {membership.name}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> $
                      {membership.price}
                    </p>
                    <p>
                      <span className="font-medium">Payment Method:</span>{" "}
                      {membership.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Transaction ID:</span>{" "}
                      {membership.transactionId}
                    </p>
                    {membership.transactionProof && (
                      <p>
                        <span className="font-medium">Proof:</span>{" "}
                        <a
                          href={membership.transactionProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          View Proof
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(membership.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Notes
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="2"
                />
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleReject(membership._id)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleVerify(membership._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembershipVerification;
