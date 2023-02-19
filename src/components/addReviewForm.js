import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Rating from "@mui/material/Rating";

const AddReviewForm = ({ media, createReview }) => {
  const defaultReview = {
    media,
    content: "",
    rating: 0,
  };
  const [newReview, setNewReview] = useState(defaultReview);

  const addReviewSubmit = (event) => {
    event.preventDefault();
    const review = newReview;
    review.rating = (newReview.rating * 10) / 5;
    review.media.title = newReview.media.isMovie
      ? newReview.media.title
      : newReview.media.name;
    createReview(review);
  };

  const formOnChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setNewReview({
      ...newReview,
      [fieldName]: fieldValue,
    });
  };

  return (
    <Form
      aria-label="Create a Review"
      name="reviewForm"
      onSubmit={addReviewSubmit}
    >
      <Rating
        name="rating"
        precision={0.5}
        defaultValue={0}
        value={newReview.rating}
        onChange={formOnChange}
      ></Rating>
      <FloatingLabel
        controlId="floatingInput"
        label="Your Review"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          controlId="content"
          name="content"
          placeholder="Your Review"
          value={newReview.content}
          style={{ height: "100px" }}
          onChange={formOnChange}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Add Review
      </Button>
    </Form>
  );
};

export default AddReviewForm;
