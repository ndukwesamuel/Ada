import React, { useState, useEffect, useCallback, useRef } from "react";
import { PaystackButton } from "react-paystack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import toast from "react-hot-toast";
import { format } from "date-fns";

const PaymentComponent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const publicKey = import.meta.env.VITE_REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [amount, setAmount] = useState(0);
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState({
    date: "",
    time: "",
  });
  const [emailValid, setEmailValid] = useState(false);

  const eventAmountRef = useRef(0);

  const fetchEventDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/public/event/${eventId}`);
      eventAmountRef.current = data?.event?.price;
      setAmount(eventAmountRef.current * numberOfTickets * 100);
      setEventDetails(data?.event);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Error fetching event details");
      setLoading(false);
    }
  }, [eventId, numberOfTickets]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => {
      const newCount = prevCount + 1;
      setAmount(newCount * eventAmountRef.current * 100);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setNumberOfTickets((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        setAmount(newCount * eventAmountRef.current * 100);
        return newCount;
      }
      return prevCount;
    });
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Buy Tickets",
    onSuccess: ({ reference }) => handlePaymentSuccess(reference),
    onClose: () => toast.error("Ticket payment cancelled"),
  };

  const handlePaymentSuccess = async (reference) => {
    try {
      const response = await axios.post("/verify-payment", { reference });

      if (response.data.success) {
        navigate("/success");
        toast.success("Ticket purchase successful!");
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Error verifying payment.");
    }
  };

  useEffect(() => {
    const { event_date } = eventDetails || {};
    const isValidDate = !isNaN(new Date(event_date).getTime());

    if (isValidDate) {
      const formattedDate = format(new Date(event_date), "do MMM yyyy");
      const formattedTime = format(new Date(event_date), "h:mm a");
      console.log(formattedDate);
      console.log(formattedTime);

      setFormattedDateTime({
        date: formattedDate,
        time: formattedTime,
      });
    } else {
      console.error("Invalid date format:");
    }

    const isNameValid = name.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = /^\d{11}$/.test(phone);
    setEmailValid(isEmailValid);
  }, [eventDetails, name, email, phone]);
  // console.log(emailValid);

  return (
    <div>
      <h1 className="text-center bg-success text-light py-3 display-4">
        Get Your tickets
      </h1>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Jumbotron
              title={eventDetails?.title}
              date={formattedDateTime.date}
              time={formattedDateTime.time}
              venue={eventDetails?.venue}
            />
            <div style={{ marginTop: "2rem" }}>
              <input
                type="text"
                className="form-control mb-4 p-3"
                placeholder="Full Name (e.g John Doe)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                type="email"
                className="form-control mb-4 p-3"
                placeholder="Email ticket (e.g example@email.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-4 p-3"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="d-flex justify-content-between align-items-center p-2 my-4">
                <b>Number Of Tickets</b>

                <div className="my-4">
                  <b
                    onClick={handleDecrement}
                    className="text-danger bg-light px-3 "
                    style={{
                      backgroundColor: "#23d5ab",
                      fontSize: "1rem",
                      border: "1px solid",
                      borderRadius: "5px",
                    }}
                  >
                    <b className="">-</b>
                  </b>
                  <b className="mx-4">{numberOfTickets}</b>
                  <b
                    onClick={handleIncrement}
                    className="text-success bg-light px-3 fw-bold"
                    style={{
                      backgroundColor: "#23d5ab",
                      fontSize: "1rem",
                      border: "1px solid",
                      borderRadius: "5px",
                    }}
                  >
                    +
                  </b>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center p-2 my-4">
                <b>Tickets Price</b>

                <div className="my-4">
                  <b
                    onClick={handleDecrement}
                    className="text-dark bg-light p-3 "
                    style={{
                      backgroundColor: "#23d5ab",
                      fontSize: "1rem",
                      border: "1px solid #04973c",
                      borderRadius: "5px",
                    }}
                  >
                    NGN {amount / numberOfTickets / 100}
                  </b>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2 my-4">
                <b>Total Amount</b>

                <div className="my-4">
                  <b
                    onClick={handleDecrement}
                    className="text-dark bg-light p-3 "
                    style={{
                      backgroundColor: "#23d5ab",
                      fontSize: "1rem",
                      border: "1px solid #04973c",
                      borderRadius: "5px",
                    }}
                  >
                    NGN {amount && amount / 100}
                  </b>
                </div>
              </div>

              {/* <div className="btn btn-block bg-success text-light mb-4 w-100 py-3">
              <PaystackButton className="paystack-button" {...componentProps} />
              </div> */}
              <div className="mb-4">
                {emailValid ? (
                  <PaystackButton
                    className="paystack-button btn btn-block bg-success text-light mb-4 w-100 py-3"
                    {...componentProps}
                  />
                ) : (
                  <button
                    disabled
                    className="paystack-button btn btn btn-block bg-success text-light mb-4 w-100 py-3"
                    style={{ cursor: "not-allowed" }}
                  >
                    Enter a valid email address
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
