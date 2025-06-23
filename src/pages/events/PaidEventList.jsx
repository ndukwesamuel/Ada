import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicEventCard from "../../components/cards/PublicEventListCard";

const PaidEventList = () => {
  const [paidEvents, setPaidEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPaidEvents = async () => {
    try {
      const response = await axios.get(
        `/public-events/paid?page=${currentPage}`
      );
      const { events, totalPages } = response.data;
      setPaidEvents(events);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching paid events:", error);
    }
  };

  useEffect(() => {
    fetchPaidEvents();
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
        {paidEvents?.map((p) => (
          <div className="col-md-6 col-lg-3" key={p._id}>
            <PublicEventCard {...p} />
          </div>
        ))}
      </div>

      <div className={`pagination ${paidEvents && paidEvents.length <= 6 && "d-none"}`}>
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

export default PaidEventList;
