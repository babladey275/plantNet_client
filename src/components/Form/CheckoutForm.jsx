import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import Button from "../Shared/Button/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CheckoutForm = ({ purchaseInfo, refetch, closeModal, totalQuantity }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPaymentIntent();
  }, [purchaseInfo]);

  console.log(clientSecret);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        quantity: purchaseInfo?.quantity,
        plantId: purchaseInfo?.plantId,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(
        error?.message || "An error occurred while processing your payment."
      );
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: purchaseInfo?.customer?.name,
          email: purchaseInfo?.customer?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      try {
        // save data in db
        await axiosSecure.post("/order", {
          ...purchaseInfo,
          transactionId: paymentIntent?.id,
        });

        // decrease quantity from plant collection
        await axiosSecure.patch(`/plants/quantity/${purchaseInfo?.plantId}`, {
          quantityToUpdate: totalQuantity,
          status: "decrease",
        });
        refetch();
        toast.success("Order Successful!");
        navigate("/dashboard/my-orders");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong!");
      } finally {
        setProcessing(false);
        closeModal();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        label={`Pay ${purchaseInfo?.price}$`}
      />
    </form>
  );
};

CheckoutForm.propTypes = {
  purchaseInfo: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  totalQuantity: PropTypes.number.isRequired,
};

export default CheckoutForm;
