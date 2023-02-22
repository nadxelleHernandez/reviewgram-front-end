import React, { useState } from "react";
import "./search.css";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";

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
    // <Form role="search" id="form" onSubmit={onFormSubmit}>
    //   <Row>
    //     <Col>
    //       <Form.Control
    //         type="text"
    //         id="query"
    //         name="search"
    //         value={formSearch}
    //         onChange={onSearchChange}
    //         placeholder="Search for movie or tv show"
    //       />
    //     </Col>
    //     <Col>
    //       <Button variant="primary" type="submit">
    //         Search
    //       </Button>
    //     </Col>
    //     <Col>
    //       <Button variant="secondary" onClick={onClearSearch}>
    //         Clear Search
    //       </Button>
    //     </Col>
    //   </Row>
    // </Form>
  );
};

export default Search;
