import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import { getEventDetails } from "../../components/helpers";
import toast from "react-hot-toast";

const FreeTicketComponent = () => {
  const { eventId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
    setNumberOfTickets(1);
  };

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setNumberOfTickets((prevCount) =>
      prevCount > 1 ? prevCount - 1 : prevCount
    );
  };

  const [eventDetails, setEventDetails] = useState({ date: "", time: "" });

  useEffect(() => {
    const fetchEventDetails = async () => {
      const details = await getEventDetails(eventId);
      if (details) {
        setEventDetails(details);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // console.log(eventDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`/process-free-event-ticket/${eventId}`, {
        name,
        email,
        phone,
        numberOfTickets,
      });

      toast.success('Ticket purchased successfully!');
      navigate('/success');
      resetForm();
    } catch (error) {
      console.error("Error processing ticket:", error.message);
      toast.error("Ticket purchased failed")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center bg-success text-light py-3 display-4">
        Get Free tickets
      </h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Jumbotron
              title={eventDetails?.title}
              date={eventDetails?.date}
              time={eventDetails?.time}
              venue={eventDetails?.venue}
            />
            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
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
 
              <div className="d-flex justify-content-between align-items-center p-2 my-4">
                <b>Number Of Tickets</b>

                <div className="my-4">
                  <b
                    onClick={handleDecrement}
                    className="text-danger bg-light px-3 "
                    style={{ backgroundColor: "#23d5ab", fontSize: "1rem", border: "1px solid", borderRadius: "5px" }}
                  >
                    <b className="">-</b>
                  </b>
                  <b className="mx-4">{numberOfTickets}</b>
                  <b
                    onClick={handleIncrement}
                    className="text-success bg-light px-3 fw-bold"
                    style={{ backgroundColor: "#23d5ab", fontSize: "1rem", border: "1px solid", borderRadius: "5px" }}
                  >
                    +
                  </b>
                </div>
              </div>
              <button className="btn btn-block bg-success text-light mb-4 w-100 py-3" type="submit">
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTicketComponent;
