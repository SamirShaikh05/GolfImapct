import { useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    try {
      setLoading(true);

      const res = await api.post("/admin/draw");

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Error running draw");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Admin Panel
          </h2>
          <p className="text-gray-500 text-sm">
            Manage draws and view results
          </p>
        </div>

        {/* ACTION CARD */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Run New Draw</h3>
            <p className="text-sm text-gray-500">
              Generate random numbers and pick winners
            </p>
          </div>

          <button
            onClick={runDraw}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Draw"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">

            <h3 className="text-lg font-semibold">Latest Draw Result</h3>

            {/* Numbers */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Draw Numbers</p>
              <div className="flex gap-2">
                {result.draw.numbers.map((num, i) => (
                  <span
                    key={i}
                    className="bg-black text-white px-3 py-1 rounded-full text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

            {/* Winners count */}
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Winners</p>
              <span className="font-semibold text-green-600">
                {result.winnersCount}
              </span>
            </div>

            {/* Optional winners list */}
            {result.winners?.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Winner IDs</p>
                <div className="space-y-2">
                  {result.winners.map((w, i) => (
                    <div
                      key={i}
                      className="text-sm bg-gray-50 px-3 py-2 rounded"
                    >
                      {w.userId}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}