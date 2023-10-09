import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import "./checkOut.module.scss"; // Import your custom CSS for styling

const CheckoutPage = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  // const [loading, setLoading] = useState(false);
  // const [cardHolderName, setCardHolderName] = useState("");
  // const [validationError, setValidationError] = useState("");

  // const handleFormSubmit = async (event: any) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     setLoading(false);
  //     console.error("Stripe.js has not loaded yet. Please try again.");
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   if (cardElement.empty ) {
  //     setLoading(false);
  //     console.error("Please enter valid card details.");
  //     return;
  //   }

  //   if (!cardHolderName) {
  //     setLoading(false);
  //     setValidationError("Cardholder name is required.");
  //     return;
  //   }

  //   try {
  //     const { token, error } = await stripe.createToken(cardElement, {
  //       name: cardHolderName, // Pass cardholder name to createToken
  //     });

  //     setLoading(false);
  //     console.log("token  => ", token);
  //     if (error) {
  //       console.error("Stripe error:", error);
  //     } else {
  //       onSubmit(token);
  //     }
  //   } catch (error) {
  //     console.error("Error creating Stripe token:", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="checkout-container">
      <h3>Payment Details</h3>
      {/* <Form onSubmit={handleFormSubmit}>
        <div className="card-element">
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
              hidePostalCode: true, // Hide the postal code (zip) field
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
              setValidationError(""); // Clear validation error on input change
            }}
            placeholder="Card Holder Name"
            isInvalid={validationError}
          />
          <Form.Control.Feedback type="invalid">
            {validationError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="checkout-button mt-3"
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </Form> */}
    </div>
  );
};

export default CheckoutPage;