import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl font-bold">GolfImpact</h1>

        {/* NAV */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-600 transition">
                Dashboard
              </Link>
              {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-gray-600 transition">
                Admin
              </Link>
              )}

              {!user?.isSubscribed ? (
                <Link
                  to="/subscribe"
                  className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
                >
                  Subscribe
                </Link>
              ) : (
                <span className="text-green-600 font-semibold">
                  Active Plan ✓
                </span>
              )}

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-600 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}