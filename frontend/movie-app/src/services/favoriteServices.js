import api from "./api";

export const getFavorites = async () => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data;
};

export const addFavorite = async (userId, movie) => {
  const response = await api.post(`/favorites/${userId}`, movie);
  return response.data;
};

export const removeFavorite = async (userId, movieId) => {
  const response = await api.delete(`/favorites/${userId}/${movieId}`);
  return response.data;
};

export const createSharedLink = async (userId) => {
  const response = await api.post("/share", { userId });
  return response.data;
};

export const getSharedList = async (shareId) => {
  const response = await api.get(`/share/${shareId}`);
  return response.data;
};
