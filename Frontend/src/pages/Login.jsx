import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });

    console.log(res.data); // debug

    login(res.data.token);
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert(err.response?.data || "Login failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="border w-full mb-2 p-2" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border w-full mb-2 p-2" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleLogin} className="bg-black text-white w-full p-2">Login</button>
      </div>
    </div>
  );
}