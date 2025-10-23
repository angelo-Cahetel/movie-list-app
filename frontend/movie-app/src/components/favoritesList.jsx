import React from "react";
import MovieCards from "./movieCards";

const FavoritesList = ({ favorites, onRemove }) => {
  return (
    <div>
      {favorites.map((movie) => (
        <MovieCards
          key={movie.id}
          movie={movie}
          isFavorite={true}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
