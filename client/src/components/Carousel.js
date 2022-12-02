import React from "react";

function Carousel(props) {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mb-4"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            height={400}
            src="https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_960_720.jpg"
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            height={400}
            src="https://cdn.pixabay.com/photo/2013/08/10/18/13/candies-171342_960_720.jpg"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            height={400}
            src="https://cdn.pixabay.com/photo/2018/01/25/08/14/beverages-3105631_960_720.jpg"
            alt="First slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
