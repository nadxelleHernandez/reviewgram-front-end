import Rating from "@mui/material/Rating";
import React from "react";

//size can be: "small", "large" or empty for medium
const MediaRating = ({ rating, size }) => {
  const returnComponent = size ? (
    <Rating
      value={(rating * 5) / 10}
      precision={0.25}
      readOnly
      getLabelText={() => `${rating}`}
      size={size}
    ></Rating>
  ) : (
    <Rating
      value={(rating * 5) / 10}
      precision={0.25}
      readOnly
      getLabelText={() => `${rating}`}
    ></Rating>
  );
  return returnComponent;
};

export default MediaRating;
