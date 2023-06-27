import { Fragment } from "react";
import "./Review.css";
import StarRating from "./StarRating";

const Review = (props) => {

  const calculateAverageRating = reviews => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const sumRatings = reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = sumRatings / totalReviews;
    return averageRating.toFixed(1); // Return average rating rounded to 2 decimal places
  }

  const averageRating = calculateAverageRating(props.reviews);

  return (
    <Fragment>
      <p>The average is  { averageRating } stars.</p>
      { props.reviews.map((review, index) => (
        <div className="container" key={ index }>
          <div className="Rname">{ review.reviewer }</div>
          <div className="Rating_date">
            <div className="rating">
              <StarRating initialRating={ review.rating } disableOnChange={ true } />
            </div>
            <div className="date">{ review.date }</div>
          </div>
          <div className="Rcontent">
            <p>{ review.content }</p>
          </div>
        </div>
      )) }
    </Fragment>
  );
};

export default Review;
