import React from "react";
import { Star, Plus, Treash2 } from "lucide-react";

const MovieCards = ({ movie, isFavorite, onAdd, onRemove }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={movie.title} />
    </div>
  );
};

export default MovieCards;