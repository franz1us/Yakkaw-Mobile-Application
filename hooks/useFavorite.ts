import { useState } from 'react';

// Custom hook to handle favorite state
export const useFavorite = () => {
  const [favorites, setFavorites] = useState<string[]>([]); // Track favorite IDs

  // Toggle the favorite status of a location
  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favId) => favId !== id); // Remove from favorites
      } else {
        return [...prevFavorites, id]; // Add to favorites
      }
    });
  };

  // Check if a location is in favorites
  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return { toggleFavorite, isFavorite };
};
