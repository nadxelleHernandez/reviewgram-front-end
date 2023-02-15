import React, { useState } from "react";

const Search = ({ createNewSearch }) => {
  const [formSearch, setFormSearch] = useState("");

  const onSearchChange = (event) => {
    event.preventDefault(event.target.value);
    setFormSearch(event.target.value);
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
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
