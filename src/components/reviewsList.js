import MediaRating from "./mediarating";
import ListGroup from "react-bootstrap/ListGroup";
import TimeStamp from "./TimeStamp";

const ReviewsList = ({ reviews }) => {
  let reviewsDisplay = [];
  if (reviews.length === 0) {
    reviewsDisplay = <ListGroup.Item as="li">No reviews yet</ListGroup.Item>;
  } else {
    reviewsDisplay = reviews.map((review) => {
      return (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{review.user.username}</div>
            <blockquote className="blockquote mb-0">
              <p>{review.content}</p>
              <footer className="blockquote-footer text-right">
                <cite>
                  Created <TimeStamp time={review.created}></TimeStamp>
                </cite>
              </footer>
            </blockquote>
          </div>
          <MediaRating rating={review.rating} size="small"></MediaRating>
        </ListGroup.Item>
      );
    });
  }

  return <ListGroup as="ol">{reviewsDisplay}</ListGroup>;
};

export default ReviewsList;
