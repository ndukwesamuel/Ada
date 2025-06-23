
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ClanDetail = () => {
  const { clanId } = useParams();
  const [clanDetails, setClanDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClanDetails = async () => {
      try {
        const response = await axios.get(`/clan/${clanId}`);
        setClanDetails(response?.data?.data);
        setLoading(false);
      } catch (error) {
        toast(error?.error || "Error fetching clan details:");
        setLoading(false);
      }
    };

    fetchClanDetails();
  }, [clanId]);

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/clan/Adminsdelete/${clanId}`);
      toast.success(data?.message || "Clan deleted successfully");
      navigate("/dashboard/estates");
    } catch (error) {
      toast.error(error?.error || "Failed to delete clan");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="bg-success text-light text-center p-3">
        Clan Detail Page
      </h1>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Clan</th>
                  <th>Creator</th>
                  <th>Clan ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{clanDetails?.name}</td>
                  <td>{clanDetails?.creator?.email}</td>
                  <td>{clanDetails?.uniqueClanID}</td>
                  <td>{clanDetails?.status}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Delete Estate</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>
                You are about to delete <b>"{clanDetails?.name}"</b> estate
                permanently.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClanDetail;
