import React from "react";
import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";

import "./reviews.css";

const Reviews = ({ media, getReviews }) => {
  return (
    <Card>
      <Card.Header className="d-flex">
        <span className="review-title">Reviews </span>
        <span>
          <MediaRating rating={media.rating}></MediaRating>
        </span>
      </Card.Header>
      <Card.Body>First review</Card.Body>
    </Card>
  );
};

export default Reviews;
