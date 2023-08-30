import React from 'react';

const ButtonSection = (props) => {
    if(props.currentStep === 0 ) {return null}

  return (
    <div className="d-flex flex-wrap justify-content-center gap-1 pt-1">
      <button
        className={
          props.currentStep < 1 ? "btn btn-primary disabled" : "btn btn-primary"
        }
        onClick={props.onBackClick}
      >
        Back
      </button>
      <button
        className={
          props.currentStep < 5 ? "btn btn-primary disabled" : "btn btn-primary"
        }
        onClick={props.onScheduleClick}
      >
        Schedule
      </button>
      <button
        className={
          props.currentStep < 3 || props.currentStep > 4
            ? "btn btn-primary disabled"
            : "btn btn-primary"
        }
        onClick={props.onContinueClick}
      >
        Continue
      </button>
    </div>
  );
};

export default ButtonSection;
