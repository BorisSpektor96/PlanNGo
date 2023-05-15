import { useState } from "react";
import styles from './StarRating.module.css'
import "bootstrap/dist/css/bootstrap.css";

const StarRating = () => {
  const [ rating, setRating ] = useState(0);
  const [ hover, setHover ] = useState(0);
  return (
    <div className="star-rating">
      { [ ...Array(5) ].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={ index }
            styles="padding: 5px"
            className={ index <= (hover || rating) ? [ styles.on ] : [ styles.off ] }
            onClick={ () => setRating(index) }
            onMouseEnter={ () => setHover(index) }
            onMouseLeave={ () => setHover(rating) }
          >
            <ion-icon name="star-outline"></ion-icon>
          </button>
        );
      }) }
    </div>
  );
};

export default StarRating;