import React from "react";
import "./ErrorPage.css";


const UnauthorizedPage = () => {
  return (
    <div className="error-page-container">
      <h1 className="arrow-text">404 Not found</h1>
      <p className="arrow-message">The page you are looking for does not exist.</p>
    </div>
  );
};

export default UnauthorizedPage;
