import React, { useState } from "react";
import "./search.css";

const Search = ({ createNewSearch, clearSearch }) => {
  const [formSearch, setFormSearch] = useState("");

  const onSearchChange = (event) => {
    setFormSearch(event.target.value);
  };

  const onClearSearch = (event) => {
    clearSearch();
    setFormSearch("");
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    createNewSearch(formSearch);
    setFormSearch("");
  };

  return (
    <div>
      <form role="search" onSubmit={onFormSubmit}>
        <input
          type="search"
          id="query"
          name="search"
          value={formSearch}
          onChange={onSearchChange}
          placeholder="Search for movie or tv show"
        />
        <button className="buttonSubmit" type="submit" onClick={onFormSubmit}>
          Search
        </button>
        <a href="#clear" className="buttonClear" onClick={onClearSearch}>
          Clear
        </a>
      </form>
    </div>
  );
};

export default Search;
