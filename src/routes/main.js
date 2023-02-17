import React, { useEffect, useState } from "react";
import Search from "../components/search";
import TopTVShows from "../components/toptvshows";
import TopMovies from "../components/topmovies";
import SearchResults from "../components/searchResults";

const Main = ({ getTopMovies, getSearchData, searchData, topTVShowsData }) => {
  return (
    <main>
      <main className="main">
        <header>
          <h1>ReviewGram</h1>
        </header>
        <section>
          <Search createNewSearch={getSearchData}></Search>
        </section>
        <section>
          <SearchResults searchData={searchData}></SearchResults>
        </section>
        <section>
          <TopMovies
            toggleShow={searchData === []}
            getTopMovies={getTopMovies}
          ></TopMovies>
        </section>
        <section>
          <TopTVShows
            toggleShow={searchData === []}
            topTVShowsData={topTVShowsData}
          ></TopTVShows>
        </section>
      </main>
    </main>
  );
};

export default Main;
