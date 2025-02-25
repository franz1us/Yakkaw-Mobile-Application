import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getAQIColor = (pm25) => {
  if (pm25 <= 20) return { background: "rgba(46, 168, 255, 0.7)", border: "#2EA8FF" };   // ฟ้า
  if (pm25 <= 50) return { background: "rgba(56, 176, 0, 0.7)", border: "#38B000" };     // เขียว
  if (pm25 <= 80) return { background: "rgba(240, 240, 0, 0.7)", border: "#F0F000" };   // เหลือง
  if (pm25 <= 150) return { background: "rgba(255, 165, 0, 0.7)", border: "#FFA500" };  // ส้ม
  if (pm25 <= 300) return { background: "rgba(255, 135, 135, 0.7)", border: "#FF8787" }; // แดงอ่อน
  return { background: "rgba(168, 115, 131, 0.7)", border: "#A87383" };                // อันตรายมาก (ม่วงเข้ม)
};

const AirQualityCard = ({ pm25, pres, temperature, humidity, location }) => {
  const markerStyle = getAQIColor(pm25);

  return (
    <View style={styles.card}>
      {/* AQI Indicator */}
      <View style={[styles.aqiContainer, { backgroundColor: markerStyle.background, borderColor: markerStyle.border }]}>
        <Text style={styles.aqiValue}>{pm25}</Text>
      </View>

      {/* Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.aqiText}>
          {pm25 <= 20 ? "Excellent" : pm25 <= 50 ? "Good" : pm25 <= 80 ? "Moderate" : pm25 <= 150 ? "Unhealthy" : "Danger"}
        </Text>
        <Text style={styles.details}>PM2.5: {pm25} µg/m³</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Temp: {temperature}°C</Text>
          <Text style={styles.stats}>Pressure: {pres} Psi</Text>
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
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
  },
  aqiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
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
