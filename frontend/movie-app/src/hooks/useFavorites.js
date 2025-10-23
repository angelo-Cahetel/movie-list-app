import { useState, useEffect } from "react";
import * as favoriteService from "../services/favoriteServices";

export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoriteService.getFavorites(userId);
      setFavorites(data.favorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, [userId]);

  return { favorites, loading, loadFavorites };
};
