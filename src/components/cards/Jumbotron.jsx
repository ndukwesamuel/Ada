import { TbCurrencyNaira } from "react-icons/tb";
import { IoCalendar, IoLocationOutline } from "react-icons/io5";

export default function Jumbotron({ title, date, time, venue }) {
  return (
    <div
      className="container jumbotron"
      style={{ marginTop: "-8px", height: "200px" }}
    >
      <div className="row">
        <div className="col text-center p-4">
          <h1
            className="fw-bold text-success"
            style={{ fontSize: "2rem", color: "#1b9448" }}
          >
            {title}
          </h1>
          <div
            className="d-flex justify-content-evenly justify-content-md-around my-1 p-md-3 align-items-center fw-bold rounded"
            style={{ fontSize: "1rem", backgroundColor: "#5fcfb534"}}
          >
            <span className="">{date}</span>
            <span className="fw-bold ">|</span>
            <span className="">{time}</span>
          </div>
          <small className=" fw-bold">
            {venue}
          </small>
        </div>
      </div>
    </div>
  );
}
