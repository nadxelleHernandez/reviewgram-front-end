import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./mediaentry.css";
import MediaRating from "./mediarating";

const MediaEntry = ({ media }) => {
  return (
    // <div id="title">
    //   <Link to={`/${media_type}/${media.TMDB_id}`}>
    //     {media.isMovie ? media.title : media.name}
    //   </Link>
    //   <span> Rating: {media.rating}</span>
    // </div>
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={media.poster_url} />
      <Card.Body>
        <Card.Title>{media.isMovie ? media.title : media.name}</Card.Title>
        <MediaRating rating={media.rating}></MediaRating>
      </Card.Body>
    </Card>
  );
};

export default MediaEntry;
