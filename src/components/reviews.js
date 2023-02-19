import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";
import "./reviews.css";
import ReviewsList from "./reviewsList";

const Reviews = ({ media, reviewsList }) => {
  return (
    <Card style={{ height: "85vh" }}>
      <Card.Header className="d-flex">
        <span className="review-title">Reviews </span>
        <span>
          <MediaRating rating={media.rating}></MediaRating>
        </span>
      </Card.Header>
      <Card.Body className="overflow-auto">
        <ReviewsList reviews={reviewsList}></ReviewsList>
      </Card.Body>
      <Card.Footer> </Card.Footer>
    </Card>
  );
};

export default Reviews;
