import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";
import ListGroup from "react-bootstrap/ListGroup";

import "./reviews.css";
import TimeStamp from "./TimeStamp";

const Reviews = ({ media, reviewsList }) => {
  const reviewsDisplay = reviewsList.map((review) => {
    return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{review.user.username}</div>
          <span className="created-title">
            Created <TimeStamp time={review.created}></TimeStamp>
          </span>
          <p>{review.content}</p>
        </div>
        <MediaRating rating={5} size="Small"></MediaRating>
      </ListGroup.Item>
    );
  });

  return (
    <Card>
      <Card.Header className="d-flex">
        <span className="review-title">Reviews </span>
        <span>
          <MediaRating rating={media.rating}></MediaRating>
        </span>
      </Card.Header>
      <Card.Body>
        <ListGroup as="ol">{reviewsDisplay}</ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Reviews;
