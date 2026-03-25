import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [value, setValue] = useState("");

  const { user } = useContext(AuthContext);

  const loadData = async () => {
    try {
      const [scoreRes, rewardRes] = await Promise.all([
        api.get("/user/scores"),
        api.get("/user/my-rewards")
      ]);

      setScores(scoreRes.data);
      setRewards(rewardRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const addScore = async () => {
    if (!value) return alert("Enter a score");

    try {
      await api.post("/user/score", { value });
      setValue("");
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const claimReward = async (id) => {
    try {
      await api.post(`/user/claim/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const totalEarnings = rewards.reduce(
    (sum, r) => r.status === "claimed" ? sum + r.amount : sum,
    0
  );

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-500 text-sm">
            Welcome back, manage your scores and rewards
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Subscription</p>
            <h3 className={`text-xl font-semibold mt-1 ${user?.isSubscribed ? "text-green-600" : "text-red-500"
              }`}>
              {user?.isSubscribed ? "Active" : "Inactive"}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Total Scores</p>
            <h3 className="text-xl font-semibold mt-1">{scores.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Latest Score</p>
            <h3 className="text-xl font-semibold mt-1">
              {scores[0]?.value || "-"}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h3 className="text-xl font-semibold mt-1 text-green-600">
              ₹{totalEarnings}
            </h3>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 🏆 REWARDS */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Your Rewards</h3>

            <div className={`${rewards.length > 2 ? "max-h-48 overflow-y-auto pr-2" : ""}`}>
              {rewards.length === 0 ? (
                <p className="text-gray-500 text-sm">No rewards yet</p>
              ) : (
                rewards.map(r => (
                  <div
                    key={r._id}
                    className="flex justify-between items-center py-3 border-b last:border-none"
                  >
                    <div>
                      <p className="font-medium">₹{r.amount}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {r.status}
                      </p>
                    </div>

                    {r.status === "pending" ? (
                      <button
                        onClick={() => claimReward(r._id)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">
                        Claimed ✓
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ➕ ADD SCORE */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Add Score</h3>

            <div className="flex gap-3">
              <input
                value={value}
                onChange={e => setValue(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter score"
              />

              <button
                onClick={addScore}
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
          </div>

        </div>

        {/* 📊 SCORES */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Your Scores</h3>

          {scores.length === 0 ? (
            <p className="text-gray-500 text-sm">No scores yet</p>
          ) : (
            scores.map((s, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b last:border-none"
              >
                <span className="font-medium">Score: {s.value}</span>
                <span className="text-sm text-gray-500">
                  {new Date(s.date).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}