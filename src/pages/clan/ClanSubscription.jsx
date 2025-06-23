import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const ClanSubscription = () => {
  const { clanId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("monthly");


  // handleSubscription
  // payment-endpoint = https://pause-web.vercel.app/payments/:clanId

  const handleSubscription = async () => {
    
    if (!email || !name || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!emailValid) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://pause-point-api-v1.onrender.com/payments/${clanId}`,
        {
          email,
          subscriptionType,
        }
      );
      // Check if the authorization_url is available in the response
    const { authorization_url } = response?.data;
    if (authorization_url) {
      console.log(authorization_url);
      // Open the Paystack payment page in a new tab
      window.open(authorization_url, '_blank');
    } else { 
      // Handle the absence of authorization_url in the response
      toast.error("Payment initiation failed. Please try again.");
    }
    } catch (error) {
      console.error("Subscription error:", error.response.data.error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    // const isNameValid = name.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const isPhoneValid = /^\d{11}$/.test(phone);
    setEmailValid(isEmailValid);
    console.log(email);
  }, [email])

  if (loading) {
    return <Loader/>
  }

  console.log(email);
  console.log(subscriptionType);

  console.log(clanId);
  return (
    <div>
      <h1 className="text-center bg-success text-light py-3 display-4">
        Clan Subscription
      </h1>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Jumbotron title={`${subscriptionType} plan`}/>
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

              <div className="">
                <select
                  className="form-control mb-4 p-3"
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                >
                  <option value="monthly">Monthly - $150</option>
                  <option value="quarterly">Quarterly - $420</option>
                  <option value="yearly">Yearly - $1600</option>
                </select>
              </div>

              <div className="mb-4">
                <button
                  onClick={handleSubscription}
                  disabled={!emailValid}
                  className="paystack-button btn btn btn-block bg-success text-light mb-4 w-100 py-3"
                >
                  {loading ? "loading..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClanSubscription;
