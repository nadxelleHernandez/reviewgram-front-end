class MovieData {
  constructor(
    tmdb_id,
    title,
    overview,
    poster_url,
    release_date,
    rating,
    original_language,
    genres,
    runtime,
    status
  ) {
    this.TMDB_id = tmdb_id;
    this.title = title;
    this.overview = overview;
    this.poster_url = poster_url;
    this.release_date = release_date;
    this.rating = rating;
    this.genres = genres;
    this.original_language = original_language;
    this.runtime = runtime;
    //status of movie - Rumored, Planned, In Production, Post Production, Released, Canceled
    this.status = status;
    this.isMovie = true;
  }
}

export default MovieData;
