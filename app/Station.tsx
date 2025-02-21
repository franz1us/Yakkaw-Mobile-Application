import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const getPM25Color = (pm25:number) => {
  if (pm25 <= 12) return "#4CAF50"; // Good
  if (pm25 <= 35.4) return "#FFEB3B"; // Moderate
  if (pm25 <= 55.4) return "#FF9800"; // Unhealthy for Sensitive Groups
  if (pm25 <= 150.4) return "#F44336"; // Unhealthy
  return "#6A1B9A"; // Very Unhealthy
};

const StationScreen = () => {
  const params = useLocalSearchParams();
  const station = JSON.parse(params.Station);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{station.place}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={28} color={isFavorite ? "#E91E63" : "#555"} />
        </TouchableOpacity>
      </View>

      <View style={[styles.pmContainer, { backgroundColor: getPM25Color(station.pm25) }]}> 
        <Text style={styles.pmText}>PM2.5 Now: {station.pm25} µg/m³</Text>
      </View>

      <Text style={styles.text}>PM2.5 1 Hour: {station.av1h} µg/m³</Text>
      <Text style={styles.text}>PM2.5 3 Hours: {station.av3h} µg/m³</Text>
      <Text style={styles.text}>PM2.5 6 Hours: {station.av6h} µg/m³</Text>
      <Text style={styles.text}>Temperature: {station.temperature}°C</Text>
      <Text style={styles.text}>Trend: {station.trend}</Text>
      <Text style={styles.updatedText}>Last Updated: {station.date} {station.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  pmContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pmText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  updatedText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
});

export default StationScreen;