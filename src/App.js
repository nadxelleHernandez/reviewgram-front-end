import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/search";
import TopMovies from "./components/topmovies";
import TopTVShows from "./components/toptvshows";

function App() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchData, setSearchData] = useState({});
  const [topMoviesData, setTopMoviesData] = useState({});

  const setSearchQuery = (search_for) => {
    console.log(search_for);
    setCurrentSearch(search_for);
  };

  useEffect(() => {
    console.log(currentSearch);
    axios
      .get(`http://127.0.0.1:5000/media/search?query=${currentSearch}`)
      // .get(
      //   `${process.env.REACT_APP_BACKEND_URL}/media/search?query=${currentSearch}`
      // )
      .then((response) => {
        setSearchData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [currentSearch]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/media/top/movies`)
      // .get(`${process.env.REACT_APP_BACKEND_URL}/media/top/movies`)
      .then((response) => {
        console.log(response.data);
        setTopMoviesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <main className="main">
        <header>
          <h1>ReviewGram</h1>
        </header>

        <section>
          <Search createNewSearch={setSearchQuery}></Search>
        </section>
        <section>
          <TopMovies
            toggleShow={currentSearch === ""}
            topMoviesData={topMoviesData}
          ></TopMovies>
        </section>
      </main>
    </div>
  );
}

export default App;
