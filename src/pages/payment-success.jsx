import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const session_id = params.get("session_id");

  useEffect(() => {
    const saveOrder = async () => {
      try {
        await axios.get(`http://localhost:4000/api/order/payment-success?session_id=${session_id}`);
        navigate("/myorders", { state: { refresh: true } }); // ✅ Redirect to My Orders
      } catch (err) {
        console.error("Error saving order:", err);
        navigate("/payment-failed");
      }
    };

    if (session_id) saveOrder();
  }, [session_id, navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Finalizing your order...</p>
    </div>
  );
};

export default PaymentSuccess;
