import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-xl font-bold">GolfImpact</h1>

      <div className="space-x-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/subscribe">Subscribe</a>
        <a href="/admin">Admin</a>

        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <a href="/">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </div>
  );
}