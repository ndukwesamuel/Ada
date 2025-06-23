import React from "react";
import checkmark from "../../assets/check240.png";

const SuccessPage = () => {
  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        gap: "2rem",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="mb-3"
      >
        <img src={checkmark} alt="" />
      </div>
      <div className="">
        <b className="">Successful!</b>
        <p>
          Your <b>ticket</b> has been sent to your <b>email</b> address
        </p>
        <div className="btn-group mt-4">
          <a href="/list" className="btn btn-outline-info">
            Buy more
          </a>
          <a href="/" className="btn btn-outline-success mx-3">
            Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
