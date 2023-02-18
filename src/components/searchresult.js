import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ media }) => {
  const nameToDisplay = media.isMovie ? media.title : media.name;
  const linkToGo = media.isMovie
    ? `/movie/${media.TMDB_id}`
    : `/tv/${media.TMDB_id}`;

  const linkDisplay = media.poster_url ? (
    <img
      src={media.poster_url}
      alt={media.isMovie ? media.title : media.name}
    ></img>
  ) : (
    "Extra Details"
  );

  return (
    <li>
      <h3>{nameToDisplay}</h3>
      <Link to={linkToGo}>{linkDisplay}</Link>
      <p>Overview: {media.overview}</p>
    </li>
  );
};

export default SearchResult;
