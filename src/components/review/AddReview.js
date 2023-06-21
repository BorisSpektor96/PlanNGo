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
    console.log(props.businessDetails)
    alert("review: " + enteredText + "\nRating: " + enteredRate + "\nDate: " + date);
    event.preventDefault();
  };

  const postReviewToBusiness = async (Rcontent, rating, date) => {
    try {
      const response = await fetch('http://localhost:3001/business/addReviewToBusiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log('User entered review successfully:', data);

    } catch (error) {
      console.error('Add review failed:', error);
    }
  };


  return (
    <Modal>
      <div className="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div>

      <form onSubmit={ handleSubmit } className="form-outline   ">
        <p className="d-flex justify-content-center">add a review</p>
        <div className="d-flex flex-sm-column">
          <label>how was your visit?</label>

          <textarea name="Rcontent" value={ enteredText } onChange={ handleText } />
          <div className="d-flex p-2 justify-content-center">
            <StarRating onChange={ starHandler } />
          </div>

          <input
            className="btn-sm btn btn-outline-success "
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </Modal>
  );
};
export default AddReview;
