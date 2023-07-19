import Modal from "../UI/Modal";
import StarRating from "./StarRating";
import { useState, useContext } from "react";
import { ProfileInfoContext } from "../../ProfileInfoContext";


const AddReview = (props) => {

  const [ anonymous, setAnonymous ] = useState(false)
  const [ reviewContent, setReviewContent ] = useState("");
  const [ reviewRate, setreviewRate ] = useState("");

  const anonymousHandler = () => {
    setAnonymous(!anonymous)
  }

  const starHandler = (value) => {
    setreviewRate(value.toString());
  }
  const handleReviewContent = (event) => {
    setReviewContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let name = props.profileInfo.fullName
    if (anonymous) {
      name = "-anonymous-"
    }
    const current = new Date();
    const reviewDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    postReviewToBusiness(name, reviewContent, reviewRate, reviewDate)
  };

  const postReviewToBusiness = async (reviewer, content, rating, date, anonymous) => {
    try {
      const formValues = {
        email: props.businessDetails.email,
        reviewer: reviewer,
        content: content,
        rating: rating,
        date: date
      };
      console.log(formValues)
      const response = await fetch('http://localhost:3001/business/addReviewToBusiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      alert(`review added successfully`);
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

      <form onSubmit={ handleSubmit } className="form-outline">
        <p className="d-flex justify-content-center">add a review</p>
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex p-2 justify-content-between">
            <label>how was your visit?</label>
            <StarRating onChange={ starHandler } />
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value="anonymous"
              id="anonymous"
              name="anonymous"
              onClick={ anonymousHandler }
            />
            <label className="form-check-label" htmlFor="anonymous">
              anonymous?
            </label>
          </div>
          <textarea className="mt-4" name="content" value={ reviewContent } onChange={ handleReviewContent } />
          <div className="p-2 mt-4 d-flex justify-content-center">
            <input
              className="btn btn-outline-success "
              type="submit"
              value="Post Review"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default AddReview;
