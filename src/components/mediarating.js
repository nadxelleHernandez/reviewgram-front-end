import Rating from "@mui/material/Rating";
import React from "react";

const MediaRating = ({ rating }) => {
  return (
    <Rating
      value={(rating * 5) / 10}
      precision={0.25}
      readOnly
      getLabelText={() => `${rating}`}
    ></Rating>
  );
};

export default MediaRating;
