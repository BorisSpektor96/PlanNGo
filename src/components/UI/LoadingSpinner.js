import React from "react";
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={ styles[ "spinner-container" ] }>
      <h1>Loading...</h1>
      <div className={ styles[ "loading-spinner" ] }>
      </div>
    </div>
  );
}
export default LoadingSpinner