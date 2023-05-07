import { Fragment } from "react";
import Rating from "./Rating";
import "./Review.css";

const Review = () => {
  const reviewContainer = (
    <div class="container">
      <div class="Rname">keren shnaider</div>
      <div class="Rating_date">
        <div class="rating">
          { " " }
          <Rating />
        </div>
        <div class="date">20/09/2021</div>
      </div>
      <div class="Rcontent">
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
