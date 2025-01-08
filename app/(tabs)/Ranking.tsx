import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Location = {
  id: string;
  name: string;
  pm25: number;
  favorite: boolean;
};

const Ranking = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([
    { id: "1", name: "Chiang Rai City", pm25: 42, favorite: false },
    { id: "2", name: "Mae Sai", pm25: 55, favorite: false },
    { id: "3", name: "Wiang Pa Pao", pm25: 37, favorite: false },
    { id: "4", name: "Chiang Khong", pm25: 48, favorite: false },
    { id: "5", name: "Mae Chan", pm25: 50, favorite: false },
    { id: "6", name: "Phan District", pm25: 39, favorite: false },
    { id: "7", name: "Mae Fah Luang", pm25: 60, favorite: false },
    { id: "8", name: "Thoen District", pm25: 45, favorite: false },
    { id: "9", name: "Chiang Saen", pm25: 53, favorite: false },
    { id: "10", name: "Doi Luang", pm25: 35, favorite: false },
  ]);

  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);

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

  const renderItem = ({ item }: { item: Location }) => {
    if (!item) return null;
    return (
      <View style={styles.slot}>
        <View>
          <Text style={styles.slotText}>{item.name}</Text>
          <Text style={styles.pmText}>PM2.5: {item.pm25} µg/m³</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={item.favorite ? "heart" : "heart-o"}
            size={24}
            color={item.favorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFavoriteSection = () =>
    favoriteLocations.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❤️ Favorite</Text>
        <FlatList
          data={favoriteLocations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: "search" }, { key: "favorites" }, { key: "ranking" }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "search":
              return (
                <TextInput
                  style={styles.input}
                  placeholder="Search Location"
                  value={searchText}
                  onChangeText={setSearchText}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              );
            case "favorites":
              return renderFavoriteSection();
            case "ranking":
              return (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🏆 Most PM2.5</Text>
                  <FlatList
                    data={filteredLocations}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                  />
                </View>
              );
            default:
              return null;
          }
        }}
      />
    </View>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
  },
  input: {
    height: 45,
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#F5F5F5", 
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  slot: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white", 
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  slotText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  pmText: {
    fontSize: 14,
    color: "gray",
  },
});
