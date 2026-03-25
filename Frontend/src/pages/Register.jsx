import { useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", data);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create account</h2>
          <p className="text-gray-500 text-sm">
            Start using GolfImpact today
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={e => setData({ ...data, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={e => setData({ ...data, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}