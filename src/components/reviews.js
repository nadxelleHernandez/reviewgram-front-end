import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import "./reviews.css";

const Reviews = ({ media, getReviews }) => {
  return (
    <Card>
      <Card.Header>
        <div className="stars-rate">
          <div className="review-title">Reviews</div>
          <Rating
            value={(media.rating * 5) / 10}
            precision={0.25}
            readOnly
          ></Rating>
        </div>
      </Card.Header>
      <Card.Body>First review</Card.Body>
    </Card>
  );
};

export default Reviews;
