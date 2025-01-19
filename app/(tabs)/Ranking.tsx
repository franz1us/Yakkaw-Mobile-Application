import React from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocations, TypeLocation } from "@/hooks/useLocations"

const Ranking = () => {
  const {
    searchText,
    setSearchText,
    favoriteLocations,
    toggleFavorite,
    filteredLocations,
  } = useLocations();

  const renderItem = ({ item }: { item: TypeLocation }) => (
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
  container: { flex: 1, padding: 5, backgroundColor: "white" },
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
  sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
  slot: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  slotText: { fontSize: 15, fontWeight: "bold" },
  pmText: { fontSize: 14, color: "gray" },
});
