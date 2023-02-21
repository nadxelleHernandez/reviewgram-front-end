import React from "react";
import SearchResult from "./searchresult";
import ListGroup from "react-bootstrap/ListGroup";

const SearchResults = ({ toggleShow, searchData }) => {
  const searchResults = searchData.map((entry) => {
    return (
      <ListGroup.Item key={entry.TMDB_id}>
        <SearchResult media={entry}></SearchResult>
      </ListGroup.Item>
    );
  });
  return <ul>{searchResults}</ul>;
};

export default SearchResults;
