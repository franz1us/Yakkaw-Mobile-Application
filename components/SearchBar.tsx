import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ranking_Data, Ranking_type } from "@/constants/Ranking_Data";

type SearchProps = {
  onFilter: (filteredResults: Ranking_type[]) => void;
};

const Search = ({ onFilter }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = Ranking_Data.filter((item: Ranking_type) =>
      item.name.toLowerCase().includes(text.toLowerCase())
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
    marginBottom:10
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

export default Search;
