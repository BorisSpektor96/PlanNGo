import React, { useState, useEffect } from "react";
import Star from "./Star";
function StarRating({ initialRating, onChange, disableOnChange  }) {
  const [ rating, setRating ] = useState(initialRating);
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const changeRating = (newRating) => {
    if (!disableOnChange) {
      setRating(newRating);
      onChange?.(newRating);
    }
  };
  return (
    <div>
      { [ 1, 2, 3, 4, 5 ].map((value) => (
        <Star
          key={ value }
          filled={ value <= rating }
          onClick={ () => changeRating(value) }
        />
      )) }
    </div>
  );
}
export default StarRating;
