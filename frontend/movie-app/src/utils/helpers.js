export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : "N/A";
};
