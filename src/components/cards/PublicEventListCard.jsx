import { Badge } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoCalendar, IoLocationOutline } from "react-icons/io5";

export default function PublicEventCard({
  _id,
  title,
  description,
  venue,
  event_date,
  price,
  sold_tickets,
  available_tickets,
  photo,
  isFree,
  slug
}) {
  // context
  //   const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      daySuffix: "numeric",
    };

    return eventDate.toLocaleString("en-US", options);
  };

  const handleNavigate = () => {
    if (isFree) {
      navigate(`/free-event/payment/${_id}`);
    } else {
      navigate(`/public-event/payment/${_id}`);
    }
  };

  return (
    <div
      className="card mb-3 hoverable bg-gray-100"
      style={{ height: "420px" }}
    >
      <Badge.Ribbon text={`${sold_tickets} sold`} color="red">
        <Badge.Ribbon
          text={`${
            available_tickets >= 1
              ? `${available_tickets} tickets avalable`
              : "Sold out"
          }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={photo}
            alt={title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body" style={{ flex: "1", overflow: "hidden" }}>
        <h3
          className="fw-bold text-1xl"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {title?.length >= 25 ? `${title?.substring(0, 20)}...` : <>{title}</>}
        </h3>

        <div
          className="d-flex align-items-center overflow-hidden"
          style={{ maxHeight: "40px", marginBottom: "8px" }}
        >
          <IoCalendar />
          <p
            className="ms-2 text-gray-600"
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {formatEventDate(event_date)}
          </p>
        </div>

        <div
          className="d-flex align-items-center overflow-hidden"
          style={{ maxHeight: "40px", marginBottom: "8px" }}
        >
          <IoLocationOutline />
          <p
            className="ms-2 text-gray-600"
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {venue?.length >= 25 ? (
              `${venue?.substring(0, 35)}...`
            ) : (
              <>{venue}</>

            )}
          </p>
        </div>

        <div className="d-flex align-items-center font-bold mt-3">
          {isFree ? (
            <span className=" ">Free</span>
          ) : (
            <>
              <TbCurrencyNaira /> <span>{price}</span>
            </>
          )}
        </div>
      </div>

      <div
        className="d-flex justify-content-between"
        style={{ height: "fit-content" }}
      >
        <button
          className="btn btn-outline-primary col card-button"
          style={{
            borderBottomLeftRadius: "5px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            flex: "1",
          }}
          onClick={() => navigate(`/public-event/${slug}`)}
        >
          View Event
        </button>

        <button
          className="btn btn-outline-success col card-button"
          style={{
            borderBottomRightRadius: "5px",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            flex: "1",
          }}
          disabled= {available_tickets === 0}
          onClick={handleNavigate}
        >
          {available_tickets === 0 ? "Sold Out" : "Get Tickets"}
        </button>
      </div>
    </div>
  );
}
