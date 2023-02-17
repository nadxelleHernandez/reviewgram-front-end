import React from "react";
import { Link } from "react-router-dom";

const MediaEntry = ({ media }) => {
  let media_type = "";
  if (media.isMovie) {
    media_type = "movie";
  } else {
    media_type = "tv";
  }
  return (
    <div>
      <Link to={`/${media_type}/${media.TMDB_id}`}>
        {media.isMovie ? media.title : media.name}
      </Link>
      <span>Rating: {media.rating}</span>
    </div>
  );
};

export default MediaEntry;
