import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar";
import RankingItem from "@/components/RankingItem";
import useRanking from "@/hooks/useRanking"; 
import { Ranking_type } from "@/constants/Ranking_Data";

const Ranking: React.FC = () => {
  const { filteredData} = useRanking();
  const [displayData, setDisplayData] = useState(filteredData);


  useEffect(() => {
    setDisplayData(filteredData);
  }, [filteredData]);
  
  const renderRankItem = ({ item }: { item: Ranking_type }) => (
    <RankingItem item={item} />
  );

  return (
    <View style={styles.container}>
      <SearchBar data={filteredData} onFilter={setDisplayData} />
      <Text style={styles.Topic}>Most PM2.5</Text>
      <FlatList
        data={displayData}
        renderItem={renderRankItem}
        keyExtractor={(item) => item.pid}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  Topic: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    padding:10,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Ranking;
