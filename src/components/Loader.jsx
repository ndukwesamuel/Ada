
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
      <div className="spinner-border spiner-grow text-success" role="status" style={{width: "3rem", height: "3rem"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
