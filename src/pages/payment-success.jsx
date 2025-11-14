import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const session_id = params.get("session_id");

  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const res = await axios.get(
          `${url}/api/order/payment-success?session_id=${session_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          navigate("/myorders", { state: { refresh: true } });
        } else {
          navigate("/payment-failed");
        }

      } catch (err) {
        console.error("Error saving order:", err);
        navigate("/payment-failed");
      }
    };

    if (session_id) saveOrder();
  }, [session_id, navigate, token, url]);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Finalizing your order...</p>
    </div>
  );
};

export default PaymentSuccess;
