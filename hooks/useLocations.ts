import { useState } from "react";
import { InitLocation } from "@/constants/InitLocation";

export type TypeLocation = {
  id: string;
  name: string;
  pm25: number;
  favorite: boolean;
};

export const useLocations = () => {
  const [locations, setLocations] = useState<TypeLocation[]>(InitLocation);
  const [favoriteLocations, setFavoriteLocations] = useState<TypeLocation[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const toggleFavorite = (id: string): void => {
    setLocations((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, favorite: !item.favorite };
          if (updatedItem.favorite) {
            setFavoriteLocations((prevFavorites) => [
              ...prevFavorites,
              updatedItem,
            ]);
          } else {
            setFavoriteLocations((prevFavorites) =>
              prevFavorites.filter((favorite) => favorite.id !== id)
            );
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const filteredLocations = locations.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return {
    searchText,
    setSearchText,
    locations,
    favoriteLocations,
    toggleFavorite,
    filteredLocations,
  };
};
