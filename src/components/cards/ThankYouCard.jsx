import PropTypes from "prop-types";
import Check from "../../assets/modal-check.png";
import CloseBtn from "../../assets/closeBtn.svg";

const ThankYouCard = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <img 
          src={CloseBtn} 
          alt="Close button" 
          className="closeBtn" 
          onClick={closeModal} 
        />
        <div className="max-w-[282px] flex flex-col items-center text-center justify-center">
          <img src={Check} alt="Success check icon" />
          <p className="text-[24px] mt-3">Successful</p>
          <p>Thank you! You will get a response soon.</p>
        </div>
      </div>
    </div>
  );
};

ThankYouCard.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ThankYouCard;
