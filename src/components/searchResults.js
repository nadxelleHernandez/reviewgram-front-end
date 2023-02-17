import React from "react";
import SearchResult from "./searchresult";

const SearchResults = ({ toggleShow, searchData }) => {
  const searchResults = searchData.map((entry) => {
    return (
      <li key={entry.TMDB_id}>
        <SearchResult media={entry}></SearchResult>
      </li>
    );
  });
  return <ul>{searchResults}</ul>;
};

export default SearchResults;
