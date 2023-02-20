import { useState, forwardRef, useImperativeHandle } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import AddReviewForm from "./addReviewForm";
import MediaRating from "./mediarating";
import "./reviews.css";
import ReviewsList from "./reviewsList";

const Reviews = forwardRef(({ media, reviewsList, createReview }, ref) => {
  const [inReviews, setInReviews] = useState("reviews");

  const handleSelect = (eventKey) => {
    setInReviews(eventKey);
  };

  return (
    <Card style={{ height: "85vh" }}>
      <Card.Header className="d-flex">
        <span className="review-title">
          <Nav
            variant="tabs"
            defaultActiveKey="reviews"
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="reviews" href="#first">
                Reviews
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addReview" href="#link">
                Add Review
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </span>
        <span>
          <MediaRating rating={media.rating}></MediaRating>
        </span>
      </Card.Header>
      <Card.Body className="overflow-auto">
        {inReviews === "reviews" && (
          <ReviewsList reviews={reviewsList}></ReviewsList>
        )}

        {inReviews === "addReview" && (
          <AddReviewForm
            media={media}
            createReview={createReview}
          ></AddReviewForm>
        )}
      </Card.Body>
      <Card.Footer> </Card.Footer>
    </Card>
  );
});

export default Reviews;
