import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePublicEvent = () => {
  const [title, setTitle] = useState("Serenity Global Concert");
  const [description, setDescription] = useState("Come and enjoy quality music for free ");
  const [venue, setVenue] = useState("Rd 45 Off Muiz Banire, By Abraham Adesanya, Ajah Lekki");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [availableTicket, setAvailableTicket] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("venue", venue);
    formData.append("category", category);
    formData.append("starts", startDate);
    formData.append("ends", startDate);
    formData.append("event_date", eventDate);
    formData.append("price", price);
    formData.append("available_tickets", availableTicket);
    formData.append("isFree", isFree);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post("public-event/create", formData);

      if (data?.message === "Event created successfully") {
        toast.success("Event created!");
        navigate('/events')
        setLoading(false);
        
      } else {
        toast.error("Failed to create Event");
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        // console.log(err);
        const { error } = err.response.data;
        toast.error(error);
      } else {
        toast.error("Failed to create event");
      }
    }
  };

  const handleIsFreeChange = () => {
    setIsFree((prevIsFree) => !prevIsFree); 
  };


//   console.log(category);
console.log(isFree);

  return (
    <div>
      <h1 className="text-center bg-success p-3  text-light">Create Event</h1>
      <form className="col-12 col-md-6 offset-md-3 my-4" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-2">
          <textarea
            className="form-control"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="d-flex  w-100 my-3 border p-2 align-items-center">
          <span className="w-50">Select Category</span>
          <select className="py-2 w-50 border border-success border-2 " name="" id="" value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="business">business</option>
            <option value="food drinks">food and drinks</option>
            <option value="music performance">music performance</option>
            <option value="arts culture">arts and culture</option>
            <option value="school education">school and education</option>
            <option value="fashion design">school and education</option>
            <option value="charity aid">school and education</option>
            <option value="all">all</option>
            <option value="religion">religion and worship</option>
          </select>
        </div>
        <div className="form-control my-2">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-2">
            <label htmlFor="">Start Date</label>
          <input
            className="form-control p-3"
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
        <label htmlFor="">End Date</label>
          <input
            className="form-control p-3"
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-2">
        <label htmlFor="">Event Date</label>
          <input
            className="form-control p-3"
            type="datetime-local"
            placeholder="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-3">
          <input
            className="form-control p-3"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-control my-3">
          <input
            className="form-control p-3"
            type="number"
            placeholder="Available Tickets"
            value={availableTicket}
            onChange={(e) => setAvailableTicket(e.target.value)}
            required
          />
        </div>
        <div className="form-control my-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div className="d-flex w-100 my-3 border p-2 align-items-center">
        <span className="w-50">Event Type</span>
        <div className="w-50">
          <label className=" p-2 d-flex align-items-center"
>
            <input
              type="checkbox"
              name="isFree"
              checked={isFree}
              onChange={handleIsFreeChange}
              style={{accentColor: "green", marginRight: "10px", width: '20px', height: '20px',}}
            />
            {!isFree ? "Paid Event" : "Free Event"}
          </label>
        </div>
      </div>
        <button className="btn btn-outline-success" type="submit">
          { loading ? 'Loading' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePublicEvent;
