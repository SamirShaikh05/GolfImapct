import api from "../api/axios";

export default function Admin() {

  const runDraw = async () => {
    await api.post("/admin/draw");
    alert("Draw executed");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <button onClick={runDraw} className="bg-purple-500 text-white px-6 py-2">
        Run Draw
      </button>
    </div>
  );
}