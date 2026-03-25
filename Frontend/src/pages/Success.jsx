import { useEffect } from "react";
import api from "../api/axios";

export default function Success() {
  useEffect(()=>{
    api.post("/user/activate-subscription");
  }, []);

  return <h2 className="p-10 text-green-600">Payment Successful 🎉</h2>;
}

