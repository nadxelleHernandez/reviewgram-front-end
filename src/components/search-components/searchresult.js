import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import MediaRating from "../media-components/mediarating";

const SearchResult = ({ media }) => {
  const linkToGo = media.isMovie
    ? `/movie/${media.TMDB_id}`
    : `/tv/${media.TMDB_id}`;

  return (
    <Container>
      <Card
        style={{ width: "55rem", height: "25rem" }}
        className="border-0 mt-2"
      >
        <Row class="row no-gutters">
          <Col>
            <Link to={linkToGo}>
              <Card.Img
                style={{ width: "18rem", height: "25rem" }}
                src={media.poster_url ? media.poster_url : ""}
                alt={media.isMovie ? media.title : media.name}
              />
            </Link>
          </Col>
          <Col>
            <Card.Body
              className="overflow-auto"
              style={{ width: "35rem", height: "25rem" }}
            >
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
