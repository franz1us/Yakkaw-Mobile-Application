import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#A8E05F"; // Good (Green)
  if (aqi <= 100) return "#FDD64B"; // Moderate (Yellow)
  if (aqi <= 150) return "#FE9B57"; // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#FE6A69"; // Unhealthy (Red)
  if (aqi <= 300) return "#A97ABC"; // Very Unhealthy (Purple)
  return "#A87383"; // Hazardous (Maroon)
};

const AirQualityCard = ({ aqi, pm25, temperature, wind, humidity, location }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.aqiContainer, { backgroundColor: getAQIColor(aqi) }]}>
        <Text style={styles.aqiValue}>{aqi}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.aqiText}>{aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : "Unhealthy"}</Text>
        <Text style={styles.details}>PM2.5: {pm25} µg/m³</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Temp: {temperature}°C</Text>
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
