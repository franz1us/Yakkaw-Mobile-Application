import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ranking_type } from "@/constants/Ranking_Data";

interface SearchProps {
  data: Ranking_type[];
  onFilter: (filteredResults: Ranking_type[]) => void;
}

const SearchBar: React.FC<SearchProps> = ({ data, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = data.filter((item) =>
      item.place.toLowerCase().includes(text.toLowerCase())
    );
    onFilter(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search locations"
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 17,
    paddingHorizontal: 12,
    backgroundColor: "#EDEDED",
  },
});

export default SearchBar;
