import api from "./api";

export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/movies/search", {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await api.get("/movies/popular", {
    params: { page },
  });
  return response.data;
};
