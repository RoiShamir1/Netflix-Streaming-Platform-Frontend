import React from "react";
import "./ErrorComponent.scss";

const ErrorComponent = ({ error }) => {
  return (
    <div className="error-container">
      <h3 className="title">Try again...</h3>
      <p>{error}</p>
    </div>
  );
};

export default ErrorComponent;
