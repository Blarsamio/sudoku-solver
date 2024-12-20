// src/components/ResetButton.jsx
import { PropTypes } from "prop-types";

const ResetButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 bg-white font-bold border border-acc-7 text-acc-9 rounded ${className} hover:bg-acc-8 hover:text-white transition-colors hover:border hover:border-acc-7`}
    >
      Reset
    </button>
  );
};

export default ResetButton;

ResetButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
