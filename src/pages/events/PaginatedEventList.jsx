import React, { useState, useEffect } from "react";
import PublicEventCard from "../../components/cards/PublicEventListCard";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";

const PaginatedPublicEventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  // console.log(location);

  const fetchEvents = async (page) => {
    try {
      const response = await axios.get(`/events/public?page=${page}`);
      const { events, totalPages } = response.data;
      setEvents(events);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4 ">
      <div className="row">
        {events?.map((p) => (
          <div className="col-md-6 col-lg-3" key={p._id}>
            <PublicEventCard {...p} />
          </div>
        ))}
      </div>

      <div className="pagination  my-4 d-flex justify-content-center align-items-center ">
        <button
          className="btn btn-warning"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage}/{totalPages}
        </span>
        <button
          className="btn btn-warning"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedPublicEventList;
