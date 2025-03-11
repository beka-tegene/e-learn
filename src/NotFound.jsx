import React from "react";

const NotFound = () => {
  return (
    <div className="main-container text-center error-404 not-found">
      <div className="container">
        <h1 style={{fontSize:"150px"}}>404</h1>
        <h1 className="title">Opps! This page Could Not Be Found!</h1>
        <p className="subtitle">
          Sorry bit the page you are looking for does not exist, have been
          removed or name changed
        </p>
        {/* .page-content */}
        <a href="/" style={{background:"#272727",color:"#FFFFFF",padding:"15px 30px"}}>
          Back to hompage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
