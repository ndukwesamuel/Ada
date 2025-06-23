import { Badge } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cart";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoCalendar, IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

export default function DetailCard({
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
  slug,
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
      className="detail-container mb-3 d-flex flex-column flex-md-row  bg-gray-100"
      style={{ width: "100%", height: "100%"}}
    >
      <>
        <div className="w-100">
          <img
            className=""
            src={photo}
            alt={title}
            style={{ width: "100%", height: "700px" }}
          />
        </div>
      </>

      <div className="w-100  " style={{ padding: "5%" }}>
        <h1 className="fw-bold text-4xl ">{title}</h1>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ fontSize: "2rem", marginTop: "2rem" }}
        >
          <div className="d-flex align-items-center font-bold mt-3">
            {isFree ? (
              <span className=" ">Free</span>
            ) : (
              <>
                <TbCurrencyNaira /> <span>{price}</span>
              </>
            )}
          </div>

          <div className="">
            <button
              className="btn btn-outline-success btn-lg "
              onClick={handleNavigate}
            >
              {isFree ? "Get Ticket" : "Buy Ticket"}
            </button>
          </div>
        </div>
        <div className="" style={{ padding: "5%" }}>
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
            className="d-flex align-items-center "
            style={{ maxHeight: "40px", marginBottom: "8px" }}
          >
            <IoLocationOutline />
            <p className="ms-2 text-gray-600">{venue}</p>
          </div>
        </div>
        <h3 className="fw-bold d-none d-md-block">About Event</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
