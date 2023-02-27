import React from "react";
import Search from "../components/search-components/search";
import TopTVShows from "../components/toptvshows";
import TopMovies from "../components/topmovies";
import SearchResults from "../components/search-components/searchResults";
import "./main.css";
import Container from "react-bootstrap/Container";

const Main = ({
  getTopMovies,
  getSearchData,
  searchData,
  getTopTVShows,
  clearSearch,
}) => {
  return (
    <Container>
      <Container className="main">
        <header className="header">
          <section id="Search">
            <Search
              createNewSearch={getSearchData}
              clearSearch={clearSearch}
            ></Search>
          </section>
        </header>
        <section id="SearchResults">
          <SearchResults searchData={searchData}></SearchResults>
        </section>
      </Container>

      <Container className="overflow-auto" id="Trending">
        <TopMovies
          id="TopMovies"
          toggleShow={searchData === []}
          getTopMovies={getTopMovies}
        ></TopMovies>
      </Container>
      <Container className="overflow-auto" id="Trending">
        <TopTVShows
          id="TopTVShows"
          toggleShow={searchData === []}
          getTopTVShows={getTopTVShows}
        ></TopTVShows>
      </Container>
    </Container>
  );
};

export default Main;
