// EventDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailCard from "../../components/cards/DetailCard";
import PublicEventCard from "../../components/cards/PublicEventListCard";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) loadEvent();
  }, [slug]);

  const loadEvent = async (req, res) => {
    try {
      const { data } = await axios.get(`/public-event/${slug}`);
      setEvent(data);
      loadRelated(data?._id, data?.category);
      setLoading(false);
    } catch (error) {
      setError(error?.message);
      setLoading(false);
      toast.error("Error loading event");
    }
  };

  const loadRelated = async (eventId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-event/${eventId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="container">
      <DetailCard {...event} />

      <div className="mt-4">
        <h1 className="bg-success text-light p-3 my-3">Similar Events</h1>
        {related?.length !== 0 ? (
          <div className="row">
            {related?.map((p) => (
              <div className="col-md-6 col-lg-3" key={p._id}>
                <PublicEventCard {...p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="" style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <b>No related similar found</b>
            {/* <a className="btn btn-info text-light d-block mt-2 w-25" href="/list">Back to events</a> */}
          </div>
        )}
      </div>
      <div className="my-2">
          <a className="btn btn-success text-light " href="/list">
            Back to events
          </a>
        </div>
    </div>
  );
};

export default EventDetail;
