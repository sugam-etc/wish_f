import React, { useState, useEffect } from "react";
import membershipService from "../../api/membershipService";
import { BACKEND_URL } from "../../config/backend";

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [rejectModal, setRejectModal] = useState({
    open: false,
    membershipId: null,
    reason: "",
  });
  const [detailModal, setDetailModal] = useState({
    open: false,
    membership: null,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    open: false,
    membershipId: null,
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const fetchMemberships = async () => {
    setLoading(true);
    try {
      const data = await membershipService.getAllMemberships({}, token);
      setMemberships(data);
    } catch (err) {
      console.error("Failed to fetch memberships:", err);
      showToast("Failed to load memberships", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const verifyMembership = async (id) => {
    try {
      await membershipService.verifyMembership(id, "Verified by admin", token);
      showToast("Membership verified");
      fetchMemberships();
    } catch (err) {
      console.error("Verification failed:", err);
      showToast("Verification failed", "error");
    }
  };

  const rejectMembership = async () => {
    if (!rejectModal.reason) {
      showToast("Please provide a rejection reason", "error");
      return;
    }
    try {
      await membershipService.rejectMembership(
        rejectModal.membershipId,
        rejectModal.reason,
        token
      );
      showToast("Membership rejected");
      setRejectModal({ open: false, membershipId: null, reason: "" });
      fetchMemberships();
    } catch (err) {
      console.error("Rejection failed:", err);
      showToast("Rejection failed", "error");
    }
  };

  const deleteMembership = async (id) => {
    setShowDeleteConfirm({ open: true, membershipId: id });
  };

  const confirmDelete = async () => {
    try {
      await membershipService.deleteMembership(
        showDeleteConfirm.membershipId,
        token
      );
      showToast("Membership deleted successfully");
      fetchMemberships();
    } catch (err) {
      console.error("Deletion failed:", err);
      showToast("Failed to delete membership", "error");
    } finally {
      setShowDeleteConfirm({ open: false, membershipId: null });
    }
  };

  const showDetails = (membership) => {
    setDetailModal({
      open: true,
      membership,
    });
  };

  const filteredMemberships = memberships.filter((m) =>
    filter === "all" ? true : m.status === filter
  );

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
      rejected: "bg-purple-100 text-purple-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colors[status] || "bg-gray-100"
        }`}
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </span>
    );
  };

  const PaymentMethodBadge = ({ method }) => {
    const methods = {
      credit_card: "Credit Card",
      paypal: "PayPal",
      bank_transfer: "Bank Transfer",
      "e-wallet": "E-Wallet",
      others: "Other",
    };
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {methods[method] || method}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white transition-all duration-300 transform ${
            toast.show ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Membership Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "active", "expired", "cancelled", "rejected"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total</h3>
          <p className="text-2xl font-bold">{memberships.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold">
            {memberships.filter((m) => m.status === "pending").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Active</h3>
          <p className="text-2xl font-bold">
            {memberships.filter((m) => m.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold">
            ${memberships.reduce((sum, m) => sum + (m.price || 0), 0)}
          </p>
        </div>
      </div>

      {/* Memberships Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMemberships.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No memberships found
                  </td>
                </tr>
              ) : (
                filteredMemberships.map((membership) => (
                  <tr key={membership._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {membership.userId?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {membership.userId?.email || "N/A"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ID: {membership.userId?._id || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {membership.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${membership.price}
                      </div>
                      {membership.autoRenew && (
                        <div className="text-xs text-blue-500 mt-1">
                          Auto-renew: ON
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <PaymentMethodBadge method={membership.paymentMethod} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {membership.transactionId}
                      </div>
                      {membership.transactionProof && (
                        <button
                          onClick={() => showDetails(membership)}
                          className="text-xs text-blue-500 hover:underline mt-1"
                        >
                          View Proof
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div>
                          Purchased:{" "}
                          {new Date(
                            membership.purchaseDate
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          Expires:{" "}
                          {new Date(membership.expiryDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {membership.verified
                            ? `Verified by admin`
                            : "Not verified"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={membership.status} />
                      {membership.verificationNotes && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          {membership.verificationNotes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => showDetails(membership)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Details
                      </button>
                      {membership.status === "pending" && (
                        <>
                          <button
                            onClick={() => verifyMembership(membership._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              setRejectModal({
                                open: true,
                                membershipId: membership._id,
                                reason: "",
                              })
                            }
                            className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteMembership(membership._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Reject Membership</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Enter rejection reason..."
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal({ ...rejectModal, reason: e.target.value })
              }
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() =>
                  setRejectModal({
                    open: false,
                    membershipId: null,
                    reason: "",
                  })
                }
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={rejectMembership}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this membership?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() =>
                  setShowDeleteConfirm({ open: false, membershipId: null })
                }
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Membership Details Modal */}
      {detailModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Membership Details</h2>
              <button
                onClick={() =>
                  setDetailModal({ open: false, membership: null })
                }
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {detailModal.membership && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">User Information</h3>
                    <p>
                      Name: {detailModal.membership.userId?.fullName || "N/A"}
                    </p>
                    <p>
                      Email: {detailModal.membership.userId?.email || "N/A"}
                    </p>
                    <p>
                      User ID: {detailModal.membership.userId?._id || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Membership Plan</h3>
                    <p>Name: {detailModal.membership.name}</p>
                    <p>Price: ${detailModal.membership.price}</p>
                    <p>
                      Auto-renew:{" "}
                      {detailModal.membership.autoRenew
                        ? "Enabled"
                        : "Disabled"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Dates</h3>
                    <p>
                      Purchased:{" "}
                      {new Date(
                        detailModal.membership.purchaseDate
                      ).toLocaleString()}
                    </p>
                    <p>
                      Expires:{" "}
                      {new Date(
                        detailModal.membership.expiryDate
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <p>
                      <StatusBadge status={detailModal.membership.status} />
                    </p>
                    <p>
                      Verified: {detailModal.membership.verified ? "Yes" : "No"}
                    </p>
                    {detailModal.membership.verificationNotes && (
                      <p>Notes: {detailModal.membership.verificationNotes}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Payment Information</h3>
                    <p>
                      Method:{" "}
                      <PaymentMethodBadge
                        method={detailModal.membership.paymentMethod}
                      />
                    </p>
                    <p>
                      Transaction ID: {detailModal.membership.transactionId}
                    </p>
                  </div>

                  <div>
                    {detailModal.membership.transactionProof && (
                      <>
                        <h3 className="font-semibold">Payment Proof</h3>
                        <div className="mt-2 border rounded p-2">
                          <img
                            src={`${BACKEND_URL}${detailModal.membership.transactionProof}`}
                            alt="Payment proof"
                            className="max-h-64 object-contain mx-auto"
                          />
                        </div>
                        <a
                          href={`${BACKEND_URL}${detailModal.membership.transactionProof}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm hover:underline"
                        >
                          View full image
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipManagement;
