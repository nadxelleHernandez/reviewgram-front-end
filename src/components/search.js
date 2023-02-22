import React, { useState } from "react";
import "./search.css";

const Search = ({ createNewSearch, clearSearch }) => {
  const [formSearch, setFormSearch] = useState("");

  const onSearchChange = (event) => {
    event.preventDefault(event.target.value);
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
    <form role="search" id="form" onSubmit={onFormSubmit}>
      <input
        type="search"
        id="query"
        name="search"
        value={formSearch}
        onChange={onSearchChange}
        placeholder="Search for movie or tv show"
      />
      <button className="buttonSubmit" type="submit">
        Search
      </button>
      <button className="buttonClear" onClick={onClearSearch}>
        Clear Search
      </button>
    </form>
  );
};

export default Search;
