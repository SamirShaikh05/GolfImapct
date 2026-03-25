import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500 text-sm">
            Login to your GolfImpact account
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}