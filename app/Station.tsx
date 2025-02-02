import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StationScreen = () => {
  const params = useLocalSearchParams();
  const station = JSON.parse(params.Station);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{station.name}</Text>
      <Text style={styles.text}>PM2.5 Now: {station.pm25_now} µg/m³</Text>
      <Text style={styles.text}>PM2.5 1 Hour: {station.pm25_1hr} µg/m³</Text>
      <Text style={styles.text}>PM2.5 3 Hours: {station.pm25_3hr} µg/m³</Text>
      <Text style={styles.text}>PM2.5 6 Hours: {station.pm25_6hr} µg/m³</Text>
      <Text style={styles.text}>Average PM2.5: {station.avg_pm25} µg/m³</Text>
      <Text style={styles.text}>Temperature: {station.temperature}°C</Text>
      <Text style={styles.text}>Trend: {station.trend}</Text>
      <Text style={styles.text}>Status: {station.context_status}</Text>
      <Text style={styles.text}>Last Updated: {station.date} {station.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default StationScreen;
