import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./routes/main";
import Movie from "./routes/movie";
import TVshow from "./routes/tv-show";
import ErrorPage from "./routes/error-page";
import UserData from "./models/userData";
import UserList from "./routes/userList";
import NavigationBar from "./components/navigationBar";

const baseURL = process.env.REACT_APP_BACKEND_URL;
let imageUrl = "";

const getImagesUrlFromAPI = () => {
  return axios
    .get(`${baseURL}/media/image-url`)
    .then((response) => {
      console.log("In getImagesUrlFromAPI");
      return response.data.configuration.base_url;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
    });
};

const getShowDataFromAPI = (tmdb_id) => {
  return axios
    .get(`${baseURL}/media/tv/${tmdb_id}`)
    .then((response) => {
      console.log("In getShowDataFromAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const getMovieDataFromAPI = (tmdb_id) => {
  return axios
    .get(`${baseURL}/media/movies/${tmdb_id}`)
    .then((response) => {
      console.log("In getMovieDataFromAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const getSearchDataFromAPI = (query) => {
  return axios
    .post(`${baseURL}/media/search`, { query })
    .then((response) => {
      console.log("In get SearchDataFromAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const convertGenresListtoString = (genres) => {
  return genres.reduce((genresStr, currentGenre) => {
    return genresStr + " / " + currentGenre;
  });
};

//-----------------Component----------------------------

function App() {
  const [searchData, setSearchData] = useState([]);
  const mockUser = new UserData(1, "reviewGram User1");

  const getShowData = (tmdb_id, size) => {
    return getShowDataFromAPI(tmdb_id).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error");
      } else {
        const tvshow = response.tvshow;
        tvshow.poster_url = tvshow.poster_url
          ? `${imageUrl}${size}${tvshow.poster_url}`
          : null;
        tvshow.genres = convertGenresListtoString(tvshow.genres);
        console.log("In getShowData");
        return tvshow;
      }
    });
  };

  const getMovieData = (tmdb_id, size) => {
    return getMovieDataFromAPI(tmdb_id).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error");
      } else {
        const movie = response.movie;
        movie.poster_url = movie.poster_url
          ? `${imageUrl}${size}${movie.poster_url}`
          : null;
        movie.genres = convertGenresListtoString(movie.genres);
        console.log("In getMovieData");
        return movie;
      }
    });
  };

  const getTopMoviesFromAPI = () => {
    return axios
      .get(`${baseURL}/media/top/movies`)
      .then((response) => {
        console.log("In getTopMoviesFromAPI");
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        return error.response.data;
      });
  };

  const getTopTVShowsFromAPI = () => {
    return axios
      .get(`${baseURL}/media/top/tvshows`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        return error.response.data;
      });
  };

  const getSearchData = (search_for) => {
    getSearchDataFromAPI(search_for).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error getting search data");
      } else {
        console.log("In getSearchData");
        const search_result = response.data;
        for (let entry of search_result) {
          if (entry.poster_url) {
            entry.poster_url = `${imageUrl}w92${entry.poster_url}`;
          }
        }
        setSearchData(search_result);
      }
    });
  };

  const getUserWatchList = (user_id) => {
    return axios
      .get(`${baseURL}/users/${user_id}/watchlist`)
      .then((response) => {
        console.log("In getUserWatchList");
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        return error.response.data;
      });
  };

  useEffect(() => {
    getImagesUrlFromAPI().then((url) => {
      imageUrl = url;
      console.log("In app useEffect");
    });
  }, []);

  return (
    <>
      <NavigationBar user_id={mockUser.id}></NavigationBar>
      <Routes>
        <Route
          path="/UserList/:user_id"
          element={<UserList getUserWatchList={getUserWatchList} />}
        ></Route>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={
            <Main
              getTopMovies={getTopMoviesFromAPI}
              getSearchData={getSearchData}
              searchData={searchData}
              getTopTVShows={getTopTVShowsFromAPI}
            />
          }
        />
        <Route
          path="/movie/:tmdb_id"
          element={<Movie getMovieData={getMovieData} user={mockUser} />}
        />
        <Route
          path="/tv/:tmdb_id"
          element={<TVshow getShowData={getShowData} user={mockUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
