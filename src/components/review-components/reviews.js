import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import AddReviewForm from "./addReviewForm";
import MediaRating from "../media-components/mediarating";
import "./reviews.css";
import ReviewsList from "./reviewsList";

const Reviews = forwardRef(
  ({ media, reviewsList, createReview, userToken }, ref) => {
    const [inReviews, setInReviews] = useState("reviews");
    const review = useRef();

    const handleSelect = (eventKey) => {
      setInReviews(eventKey);
    };

    // const changeTab = (eventkey) => {
    //   setInReviews(eventkey);
    //   review.select();
    // };

    // useImperativeHandle(ref, () => ({
    //   changeTab,
    // }));

    return (
      <Card style={{ height: "85vh" }}>
        <Card.Header className="d-flex">
          <span className="review-title">
            <Nav
              variant="tabs"
              defaultActiveKey={inReviews}
              onSelect={handleSelect}
            >
              <Nav.Item>
                <Nav.Link ref={review} eventKey="reviews" href="#first">
                  Reviews
                </Nav.Link>
              </Nav.Item>
              {userToken !== "" && (
                <Nav.Item>
                  <Nav.Link eventKey="addReview" href="#link">
                    Add Review
                  </Nav.Link>
                </Nav.Item>
              )}
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
  }
);

export default Reviews;
