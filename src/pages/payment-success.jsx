import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const session_id = params.get("session_id");
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    if (!session_id) {
      navigate("/payment-failed");
      return;
    }

    // ⏩ Immediately redirect user (no delay)
    navigate("/myorders", { state: { refresh: true } });

    // 🔄 Save order silently in background
    axios.get(`${url}/api/order/payment-success`, {
      params: { session_id },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    }).catch(err => console.log("Order save failed:", err));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default PaymentSuccess;
