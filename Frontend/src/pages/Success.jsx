import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const activate = async () => {
      try {
        await api.post("/user/activate-subscription");

        setLoading(false);
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    activate();
  }, [navigate]);

  return (
    <div className="p-10">
      {loading ? (
        <p>Processing payment...</p>
      ) : (
        <h2 className="text-green-600 text-xl">
          Payment Successful 🎉 Redirecting...
        </h2>
      )}
    </div>
  );
}