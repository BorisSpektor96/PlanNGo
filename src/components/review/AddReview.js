import Modal from "../UI/Modal";
import StarRating from "./StarRating";
import { useState } from "react";

const AddReview = (props) => {
  const hasReviewed = props.businessDetails.reviews.some(
    (review) => review.userEmail === props.profileInfo.email
  );

  const [ anonymous, setAnonymous ] = useState(false);
  const [ reviewContent, setReviewContent ] = useState("");
  const [ reviewRate, setReviewRate ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = anonymous ? "-anonymous-" : props.profileInfo.fullname;
    const userEmail = props.profileInfo.email;
    const current = new Date();
    const reviewDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    await props.handleReviewUpdate(
      name,
      reviewContent,
      reviewRate,
      reviewDate,
      userEmail
    );
    props.onClose();
  };

  return (
    <Modal>
      <div className="d-flex flex-row justify-content-end p-1 w-100 p-3">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={ props.onClose }
        ></button>
      </div>

      <form onSubmit={ handleSubmit } className="form-outline">
        <p className="d-flex justify-content-center">add a review</p>
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex p-2 justify-content-between">
            <label>how was your visit?</label>
            <StarRating
              onChange={ (value) => setReviewRate(value.toString()) }
              disableOnChange={ hasReviewed }
            />
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value="anonymous"
              id="anonymous"
              name="anonymous"
              onClick={ () => setAnonymous(!anonymous) }
              disabled={ hasReviewed }
            />
            <label className="form-check-label" htmlFor="anonymous">
              anonymous?
            </label>
          </div>
          <textarea
            className="mt-4"
            name="content"
            value={ reviewContent }
            onChange={ (event) => setReviewContent(event.target.value) }
            disabled={ hasReviewed }
          />
          { hasReviewed && (
            <div className=" p-1 text-center ">
              <p
                style={ {
                  fontSize: "12px",
                  padding: "3px",
                  color: "red",
                } }
              >
                You can review this business only once.
              </p>
            </div>
          ) }
          <div className="p-1 d-flex justify-content-center">
            <input
              className={
                !hasReviewed
                  ? "btn btn-outline-success "
                  : "btn btn-outline-danger "
              }
              type="submit"
              value="Post Review"
              disabled={ hasReviewed }
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddReview;