class TVShowData {
  constructor(
    TMDB_id,
    name,
    overview,
    rating,
    poster_url,
    original_language,
    origin_country,
    number_of_episodes,
    number_of_seasons,
    first_air_date,
    last_air_date,
    status,
    episode_runtime,
    genres
  ) {
    this.TMDB_id = TMDB_id;
    this.name = name;
    this.overview = overview;
    this.rating = rating;
    this.poster_url = poster_url;
    this.original_language = original_language;
    this.origin_country = origin_country;
    this.number_of_episodes = number_of_episodes;
    this.number_of_seasons = number_of_seasons;
    this.status = status;
    this.first_air_date = first_air_date;
    this.last_air_date = last_air_date;
    //this.providers = providers
    this.episode_runtime = episode_runtime;
    this.genres = genres;
  }
}

export default TVShowData;
