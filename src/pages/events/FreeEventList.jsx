import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicEventCard from "../../components/cards/PublicEventListCard";

const FreeEventList = () => {
  const [freeEvents, setFreeEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFreeEvents = async () => {
    try {
      const response = await axios.get(
        `/public-events/free?page=${currentPage}`
      );
      const { events, totalPages } = response.data;
      setFreeEvents(events);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching free events:", error);
    }
  };

  useEffect(() => {
    fetchFreeEvents();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div className="row">
        {freeEvents?.map((p) => (
          <div className="col-md-6 col-lg-3" key={p._id}>
            <PublicEventCard {...p} />
          </div>
        ))}
      </div>

      <div className={`pagination ${freeEvents && freeEvents.length <= 6 && "d-none"}`}>
        <button
          className="btn btn-secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage}/{totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FreeEventList;
