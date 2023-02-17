import React from "react";
import { Link } from "react-router-dom";

const MediaEntry = ({ media }) => {
  return (
    <div>
      <Link to={`/movie/${media.TMDB_id}`}>{media.title}</Link>
      <span>Rating: {media.rating}</span>
    </div>
  );
};

export default MediaEntry;
