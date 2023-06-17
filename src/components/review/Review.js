import { Fragment } from "react";
import "./Review.css";
import StarRating from "./StarRating";

const Reviews = [
  {
    Rname: "keren shnaider",
    Rating_date: "20/09/2021",
    Rcontent:
      "It was a simple tip of the hat. Grace didn't think that anyone else besides her had even noticed it. It wasn't anything that the average person would notice, let alone remember at the end of the day. That's why it seemed so unbelievable that this little gesture would ultimately change the course of the world",
    rating: 2,
  },
  {
    Rname: "John Doe",
    Rating_date: "12/05/2022",
    Rcontent:
      "The service provided was exceptional. The staff was friendly and knowledgeable. I was impressed by the attention to detail and the quality of their work. Highly recommended!",
    rating: 4,
  },
  {
    Rname: "Sarah Johnson",
    Rating_date: "03/11/2023",
    Rcontent:
      "I had a wonderful experience at this place. The ambiance was cozy, and the staff was welcoming. The food was delicious, and the prices were reasonable. I can't wait to go back!",
    rating: 5,
  },
];

function calculateAverageRating(reviews) {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return 0; // Return 0 if there are no reviews
  }

  const sumRatings = reviews.reduce((total, review) => total + review.rating, 0);
  const averageRating = sumRatings / totalReviews;

  return averageRating.toFixed(1); // Return average rating rounded to 2 decimal places
}

const averageRating = calculateAverageRating(Reviews);


const Review = (props) => {
  return (
    <Fragment>
      <p>The average is  {averageRating} stars.</p>
      {Reviews.map((review, index) => (
        <div className="container" key={index}>
          <div className="Rname">{review.Rname}</div>
          <div className="Rating_date">
            <div className="rating">
            <StarRating initialRating={review.rating} disableOnChange={true}/>
            </div>
            <div className="date">{review.Rating_date}</div>
          </div>
          <div className="Rcontent">
            <p>{review.Rcontent}</p>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Review;
