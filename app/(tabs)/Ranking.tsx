import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Search from "@/components/SearchBar";
import { Ranking_Data, Ranking_type } from "@/constants/Ranking_Data";
import { router } from "expo-router";

const Ranking = () => {
  const [filteredData, setFilteredData] =
    useState<Ranking_type[]>(Ranking_Data);
  const route = router;

  const handleFilter = (filteredResults: Ranking_type[]) => {
    setFilteredData(filteredResults);
  };

  const renderRankItem = ({ item }: { item: Ranking_type }) => (
    <TouchableOpacity
      style={styles.ContainerItem}
      onPress={() => route.push(`/(tabs)/Home`)}
    >
      <View style={styles.ItemContainer}>
        <View style={styles.LeftContainer}>
          <View style={styles.Circle}>
            <Text style={styles.Text_white}>6 hours</Text>
            <Text style={styles.big_textWhite}>{item.pm25_6hr}</Text>
            <Text style={styles.Text_white}>ug/m³</Text>
            <Text style={styles.Text_white}>{item.temperature}°C</Text>
          </View>
          <Text>{item.context_status}</Text>
        </View>

        <View style={styles.CenterContainer}>
          <View>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.date}   {item.time} PM</Text>
          </View>
          <Text style={styles.locationName}>Average</Text>

          <View style={styles.Average_Container}>
            <View style={styles.Average_Item}>
              <View style={styles.Average_Item1}>
                <Text style={styles.Avg_text1}>{item.pm25_now}</Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>Now</Text>
              </View>
            </View>
            <View style={styles.Average_Item}>
              <View style={styles.Average_Item1}>
                <Text style={styles.Avg_text1}>{item.pm25_now}</Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>3 hours</Text>
              </View>
            </View>
            <View style={styles.Average_Item}>
              <View style={styles.Average_Item1}>
                <Text style={styles.Avg_text1}>{item.pm25_now}</Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>6 hours</Text>
              </View>
            </View>
          </View>


          <View><Text style={styles.locationName}>Trend {item.trend}</Text></View>
        </View>

        <View style={styles.RightContainer}>
          <Text>Right</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Search onFilter={handleFilter} />
      <Text style={styles.Topic}>Most PM2.5</Text>
      <FlatList
        data={filteredData}
        renderItem={renderRankItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found.</Text>
        }
      />
    </View>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  ContainerItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 3,
  },
  ItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  Circle: {
    backgroundColor: "#FF2C2C",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#FF8787",
  },
  LeftContainer: {
    alignItems: "center",
  },
  CenterContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    width: 180,
  },
  RightContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  Average_Container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  Average_Item: {
    justifyContent: "center",
    alignItems: "center",
  },
  Average_Item1: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    backgroundColor: "#FF2C2C",
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 3,
  },
  Avg_text1: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  Avg_text2: {
    color: "#AEAEAE",
    fontSize: 14,
    fontWeight: "600",
  },
  Average_Item2: {
    marginTop: 2,
    alignItems: "center",
  },

  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  Topic: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
  },

  Text_white: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
  big_textWhite: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
});
