import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [value, setValue] = useState("");

  const load = async () => {
    const res = await api.get("/user/scores", {
      headers: {
        "Cache-Control": "no-cache"
      }
    });

    console.log(res.data); // DEBUG
    setScores(res.data);
  };

  const addScore = async () => {
    await api.post("/user/score", { value });
    setValue("");
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>

      <div className="mb-4">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Score"
        />
        <button onClick={addScore} className="bg-black text-white px-4 py-2">
          Add
        </button>
      </div>

      <div>
        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s, i) => (
            <div key={i}>
              {s.value}
            </div>
          ))
        )}
      </div>
    </div>
  );
}