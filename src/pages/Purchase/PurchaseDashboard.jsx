import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
import { BACKEND_URL } from "../../config/backend";

const AdminPurchaseDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `${BACKEND_URL}/api/purchases`,
          config
        );
        setPurchases(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch purchases");
        setLoading(false);
      }
    };

    if (user && user.role === "admin") {
      fetchPurchases();
    }
  }, [user]);

  const updateStatus = async (purchaseId, newStatus) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${BACKEND_URL}/api/purchases/${purchaseId}/status`,
        { status: newStatus },
        config
      );

      // Update the local state to reflect the change
      setPurchases(
        purchases.map((purchase) =>
          purchase._id === purchaseId
            ? { ...purchase, status: newStatus }
            : purchase
        )
      );

      return data;
    } catch (error) {
      console.error("Error updating purchase status:", error);
      setError(error.response?.data?.message || "Failed to update status");
      throw error;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-4xl mx-auto mt-8 text-center">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Purchase Management
          </h2>
          <div className="text-sm text-gray-500">
            Total Purchases: {purchases.length}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.map((purchase) => (
                <tr
                  key={purchase._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                    {purchase.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {purchase.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {purchase.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <ul className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex justify-between"
                        >
                          <span className="truncate">{item.name}</span>
                          <span className="ml-2 text-gray-500">
                            x{item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${purchase.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        purchase.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : purchase.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {purchase.status.charAt(0).toUpperCase() +
                        purchase.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-gray-400 text-xs">
                      {new Date(purchase.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-y-2">
                    {purchase.status === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateStatus(purchase._id, "completed")
                          }
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(purchase._id, "cancelled")
                          }
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <a
                      href={`${BACKEND_URL}/${purchase.paymentProof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      View Proof
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPurchaseDashboard;
