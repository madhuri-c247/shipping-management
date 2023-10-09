import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import styles from "./checkOut.module.scss";

const CheckoutPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      console.error("Stripe.js has not loaded yet. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement && !cardElement) {
      setLoading(false);
      console.error("Please enter valid card details.");
      return;
    }

    if (!cardHolderName) {
      setLoading(false);
      setValidationError("Cardholder name is required.");
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement!, {
        name: cardHolderName, // Pass cardholder name to createToken
      });

      setLoading(false);
      console.log("token  => ", token);
      if (error) {
        console.error("Stripe error:", error);
      } else {
        onSubmit(token);
      }
    } catch (error) {
      console.error("Error creating Stripe token:", error);
      setLoading(false);
    }
  };

  const onSubmit = (token: any) => {
    // Handle token submission
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.checkoutContainer}`}>
        <h3>Payment Details</h3>
        <Form onSubmit={handleFormSubmit}>
          <div className={`${styles.cardElement}`}>
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
                hidePostalCode: true,
              }}
            />
          </div>
          <Form.Group>
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              value={cardHolderName}
              onChange={(e) => {
                setCardHolderName(e.target.value);
                setValidationError("");
              }}
              placeholder="Card Holder Name"
              isInvalid={!!validationError}
            />
            <Form.Control.Feedback type="invalid">
              {validationError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className={`${styles.checkoutButton} mt-3`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
