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

    const confirmOrder = async () => {
      try {
        console.log("🔄 Saving order...");
        const res = await axios.get(`${url}/api/order/payment-success`, {
          params: { session_id },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });

        if (res.data.success) {
          console.log("✅ Order saved!");
          navigate("/myorders", { state: { refresh: true } });
        } else {
          console.log("❌ Save failed, redirecting");
          navigate("/payment-failed");
        }
      } catch (err) {
        console.error("❌ Order save error:", err);
        navigate("/payment-failed");
      }
    };

    confirmOrder();
  }, [session_id, navigate, token, url]);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>⏳ Finalizing your payment...</h1>
      <p>Please wait while we confirm your order.</p>
    </div>
  );
};

export default PaymentSuccess;
