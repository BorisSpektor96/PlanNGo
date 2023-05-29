import Modal from "../UI/Modal";
import StarRating from "./StarRating";
import { useState } from "react";

const AddReview = (props) => {
  const [ enteredText, setEnteredText ] = useState("");
  const [ enteredRate, setEnteredRate ] = useState("");
  function starHandler(value) {
    setEnteredRate(value.toString());
  }
  const handleText = (event) => {
    setEnteredText(event.target.value);
  };
  const handleSubmit = (event) => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    alert("review: " + enteredText + "\nRating: " + enteredRate + "\nDate: " + date);
    event.preventDefault();
  };

  return (
    <Modal>
      <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div>
      <form onSubmit={ handleSubmit } className="form-outline   ">
        <p class="d-flex justify-content-center">add a review</p>
        <div class="d-flex flex-sm-column">
          <label>how was your visit?</label>

          <textarea value={ enteredText } onChange={ handleText } />
          <div class="d-flex p-2 justify-content-center">
            { " " }
            <StarRating onChange={ starHandler } />{ " " }
          </div>

          <input
            class="btn-sm btn btn-outline-success "
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </Modal>
  );
};
export default AddReview;
