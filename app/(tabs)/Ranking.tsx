import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocations, TypeLocation } from "@/hooks/useLocations";

const Ranking = () => {
  const {
    searchText,
    setSearchText,
    favoriteLocations,
    toggleFavorite,
    filteredLocations,
  } = useLocations();

  const renderItem = ({ item }: { item: TypeLocation }) => (
    <View style={[styles.card, item.favorite && styles.favoriteCard]}>
      <View
        style={[
          styles.circleWrap,
          {
            borderColor:
              item.pm25 > 100
                ? "#FF8787"
                : item.pm25 > 50
                ? "#FFFFA8"
                : item.pm25 > 30
                ? "#BFFFA1"
                : "#C1E5FF",
            backgroundColor:
              item.pm25 > 100
                ? "red"
                : item.pm25 > 50
                ? "#FFFF00"
                : item.pm25 > 30
                ? "#38B000"
                : "#2EA8FF",
          },
        ]}
      >
        <Text
          style={[
            styles.pmValue,
            {
              color:
                item.pm25 > 100
                  ? "white"
                  : item.pm25 > 50
                  ? "balck"
                  : item.pm25 > 30
                  ? "white"
                  : "white",
            },
          ]}
        >
          {item.pm25} µg/m³
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.pmLabel}>PM2.5:</Text>
          <Text
            style={[
              styles.pmValue,
              {
                color:
                  item.pm25 > 100
                    ? "red"
                    : item.pm25 > 50
                    ? "orange"
                    : item.pm25 > 30
                    ? "green"
                    : "blue",
              },
            ]}
          >
            {item.pm25} µg/m³
          </Text>
        </View>
      </View>
      {/* Favorite Button */}
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          name={item.favorite ? "heart" : "heart-o"}
          size={24}
          color={item.favorite ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );

  const renderFavoriteSection = () =>
    favoriteLocations.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❤️ Favorite Locations</Text>
        <FlatList
          data={favoriteLocations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // Prevent nested scrolling
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
                  <Text style={styles.sectionTitle}>🏆Most PM2.5</Text>
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
    padding: 10,
    backgroundColor: "#F9F9F9",
  },
  input: {
    height: 45,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 25,
    elevation: 2,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  favoriteCard: {
    backgroundColor: "#FFEEEE",
  },
  locationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pmLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  circleWrap: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    elevation: 3, //Add shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 4, 
  },
  pmValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
