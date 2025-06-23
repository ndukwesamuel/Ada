import { useEffect, useState } from "react";
// import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import PublicEventListCard from "../../components/cards/PublicEventListCard";
import FreeEventList from "./FreeEventList";
import PaidEventList from "./PaidEventList";

const PublicEventList = function () {
  const [events, setEvents] = useState([]);
  const [total, setTotalEvents] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      //   setTotal(data);
    } catch (err) {
      // console.log(err);
    }
  };

  const loadEvents = async () => {
    try {
      const { data } = await axios.get(
        `/events/public?page=${page}&limit=${limit}`
      );
      axios.defaults.headers.common['If-None-Match'] = response.headers.etag;
      setEvents(data?.events);
      setTotalEvents(data?.totalEvents);
      // console.log(products);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/events/public?page=${page}&limit=${limit}`
      );
      axios.defaults.headers.common['If-None-Match'] = response.headers.etag;
      setEvents([...events, ...data.events]);
      // console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  const arr = [...events];
  const sortedBySold = arr?.sort((a, b) =>
    a.sold_tickets < b.sold_tickets ? 1 : -1
  );

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="p-3 mt-2 mb-2 h4 bg-success text-light text-center">
              Free Events
            </h2>
            <FreeEventList />
          </div>
        </div>

        <div className="row my-4">
          <div className="col">
            <h2 className="p-3 mt-2 mb-2 h4 bg-success text-light text-center">
              Paid Events
            </h2>
            <PaidEventList />
          </div>
        </div>

        <div className="container text-center p-5">
          {events && events.length < total && (
            <button
              className="btn btn-warning btn-lg col-md-6"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
        <div className="my-2">
          <a className="btn btn-success text-light d-block w-25" href="/list">
            Back to events
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicEventList;
