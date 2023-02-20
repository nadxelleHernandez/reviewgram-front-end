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

const getReviewsFromAPI = (tmdb_id, isMovie) => {
  const typeMedia = isMovie ? "movies" : "tv";
  const reviewUrl = `${baseURL}/media/${typeMedia}/${tmdb_id}/reviews`;

  return axios
    .get(reviewUrl)
    .then((response) => {
      console.log(`In get ReviewsFromAPI url: ${reviewUrl}`);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const createReviewAPI = (userId, review) => {
  const addReviewUrl = `${baseURL}/users/${userId}/reviews`;
  return axios
    .post(addReviewUrl, review)
    .then((response) => {
      console.log("In create ReviewsFromAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const addToWatchlistAPI = (media, user) => {
  const requestBody = {
    TMDB_id: media.TMDB_id,
    isMovie: media.isMovie,
    title: media.isMovie ? media.title : media.name,
  };
  const url = `${baseURL}/users/${user.id}/watchlist`;
  return axios
    .post(url, requestBody)
    .then((response) => {
      console.log("In create addToWatchlistAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const addToWatchedAPI = (media, user) => {
  const requestBody = {
    TMDB_id: media.TMDB_id,
    isMovie: media.isMovie,
    title: media.isMovie ? media.title : media.name,
  };
  const url = `${baseURL}/users/${user.id}/watched`;
  return axios
    .post(url, requestBody)
    .then((response) => {
      console.log("In create addToWatchedAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

//-----------------Component----------------------------

function App() {
  const [searchData, setSearchData] = useState([]);
  const mockUser = new UserData(1, "reviewGramUser1");

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
        const top_movies = response.data;
        console.log(top_movies);
        for (let movie of top_movies["movies"]) {
          if (movie.poster_url) {
            movie.poster_url = `${imageUrl}w92${movie.poster_url}`;
          }
        }
        return top_movies;
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

  const getReviews = (tmdb_id, isMovie) => {
    return getReviewsFromAPI(tmdb_id, isMovie).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error getting reviews for Media");
      } else {
        console.log("In getReviews");
        return response.reviews;
      }
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
          element={
            <Movie
              getMovieData={getMovieData}
              user={mockUser}
              getReviews={getReviews}
              addReview={createReviewAPI}
              addToWatchlist={addToWatchlistAPI}
              addToWatched={addToWatchedAPI}
            />
          }
        />
        <Route
          path="/tv/:tmdb_id"
          element={
            <TVshow
              getShowData={getShowData}
              user={mockUser}
              getReviews={getReviews}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
