import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import MediaRating from "./mediarating";

const SearchResult = ({ media }) => {
  const linkToGo = media.isMovie
    ? `/movie/${media.TMDB_id}`
    : `/tv/${media.TMDB_id}`;

  return (
    <Container>
      <Card style={{ width: "45rem", height: "25rem" }}>
        <Row class="row no-gutters">
          <Col>
            <Card.Img
              style={{ width: "18rem", height: "25rem" }}
              src={media.poster_url ? media.poster_url : ""}
              alt={media.isMovie ? media.title : media.name}
            />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>
                {media.isMovie ? media.title : media.name}
              </Card.Title>
              <Card.Subtitle>
                <MediaRating rating={media.rating}></MediaRating>
              </Card.Subtitle>
              <Card.Text>Overview: {media.overview}</Card.Text>
              <Button variant="link">
                <Link to={linkToGo}>More Details</Link>
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SearchResult;
