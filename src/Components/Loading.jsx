import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <ClipLoader color={"#d91921"} loading={true} size={50} aria-label="Loading Spinner" data-testid="loader" />
      <span className="lable">Loading...</span>
    </div>
  );
};

export default Loading;
