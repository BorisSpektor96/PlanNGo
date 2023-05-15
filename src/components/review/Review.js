import { Fragment } from "react";
import "./Review.css";
import StarRating from "./StarRating";

const Review = () => {

  const reviewContainer = (
    <div className="container">
      <div className="Rname">keren shnaider</div>
      <div className="Rating_date">
        <div className="rating">
          { " " }
          <StarRating />
        </div>
        <div className="date">20/09/2021</div>
      </div>
      <div className="Rcontent">
        <p>
          It was a simple tip of the hat. Grace didn't think that anyone else
          besides her had even noticed it. It wasn't anything that the average
          person would notice, let alone remember at the end of the day.
          That's why it seemed so unbelievable that this little gesture would
          ultimately change the course of the world.
        </p>
      </div>
    </div>
  )

  return (
    <Fragment>
      { reviewContainer }
      { reviewContainer }
    </Fragment>
  );
};
export default Review;
