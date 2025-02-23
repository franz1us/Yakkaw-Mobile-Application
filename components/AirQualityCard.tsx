import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getAQIColor = (pm25) => {
  if (pm25 <= 20) return "#508C9B"; 
  if (pm25 <= 50) return "#4CAF50"; 
  if (pm25 <= 80) return "#FFEB3B"; 
  if (pm25 <= 150) return "#FF9800"; 
  if (pm25 <= 300) return "#F44336"; 
  return "#A87383"; // Hazardous (Maroon)
};

const AirQualityCard = ({ pm25, pres,temperature, humidity, location }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.aqiContainer, { backgroundColor: getAQIColor(pm25) }]}>
        <Text style={styles.aqiValue}>{pm25}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.aqiText}>{pm25 <= 20 ? "Excellent" : pm25 <= 50 ? "Good" : pm25 <= 100 ? "Moderate" : pm25 <= 100 ? "Unhealthy" : "Danger"}</Text>
        <Text style={styles.details}>PM2.5: {pm25} µg/m³</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Temp: {temperature}°C</Text>
          <Text style={styles.stats}>Pressure: {pres}Psi</Text>
          <Text style={styles.stats}>Humidity: {humidity}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  aqiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  aqiValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    marginLeft: 15,
  },
  aqiText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  stats: {
    fontSize: 12,
    color: "#777",
    marginRight: 10,
  },
});

export default AirQualityCard;
