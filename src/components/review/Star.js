import { FaStar } from "react-icons/fa";
function Star({ filled, onClick }) {
  return (
    <FaStar
      color={ filled ? "orange" : "gray" }
      onClick={ onClick } />
  );
}
export default Star;