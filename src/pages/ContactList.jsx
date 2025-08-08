import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";

export default function ContactList() {
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });
  const [data, setData] = useState([]);

  const loadData = async () => {
    setStatus({ error: "", loading: true, success: "" });
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "contact"); // adjust to "contacts" if that's your actual node
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const raw = snapshot.val();
        const list = Object.entries(raw).map(([key, item]) => ({
          id: key,
          name: item.name || "",
          email: item.email || "",
          message: item.message || "",
          createdAt: item.createdAt || null,
        }));
        // optional: sort newest first
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setData(list);
        setStatus({
          error: "",
          loading: false,
          success: "Data fetched successfully",
        });
      } else {
        setData([]);
        setStatus({
          error: "",
          loading: false,
          success: "No contacts found",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ error: "Failed to load data", loading: false, success: "" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (ts) => {
    if (!ts) return "-";
    const d = new Date(ts);
    return d.toLocaleString();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Contact Submissions</h2>

      {status.error && (
        <div className="px-4 py-2 bg-red-100 text-red-700 rounded">{status.error}</div>
      )}
      {status.success && (
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded">{status.success}</div>
      )}

      <div className="space-y-4">
        {status.loading && (
          <div className="text-sm text-gray-600">Loading contacts...</div>
        )}

        {!status.loading && data.length === 0 && (
          <div className="text-sm text-gray-500">No contacts to display.</div>
        )}

        {data.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <div className="font-medium text-lg">{item.name || "Unnamed"}</div>
              <div className="text-xs text-gray-500">{formatDate(item.createdAt)}</div>
            </div>
            <div className="text-sm">
              <div>
                <span className="font-semibold">Email: </span>
                {item.email || "-"}
              </div>
              <div className="mt-1">
                <span className="font-semibold">Message: </span>
                <div className="whitespace-pre-wrap">{item.message || "-"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
