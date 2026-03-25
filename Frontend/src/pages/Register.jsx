import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

const handleRegister = async () => {
  try {
    await api.post("/auth/register", data);
    alert("Registered successfully");
    navigate("/");
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.msg || "Registration failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow rounded w-80">
        <input placeholder="Name" className="border w-full mb-2 p-2"
          onChange={e=>setData({...data,name:e.target.value})}/>
        <input placeholder="Email" className="border w-full mb-2 p-2"
          onChange={e=>setData({...data,email:e.target.value})}/>
        <input type="password" placeholder="Password" className="border w-full mb-2 p-2"
          onChange={e=>setData({...data,password:e.target.value})}/>
        <button onClick={handleRegister} className="bg-black text-white w-full p-2">
          Register
        </button>
      </div>
    </div>
  );
}