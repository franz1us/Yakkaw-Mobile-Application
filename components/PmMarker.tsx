import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const PmMarker = ({ pm25, trend, onPress }) => {
  // Determine PM2.5 background color
  const getCircleColor = () => {
    if (pm25 <= 20) return "#508C9B"
    if (pm25 <= 50) return "#4CAF50"; // Green (Good)
    if (pm25 <= 80) return "#FFEB3B"; // Yellow (Moderate)
    if (pm25 <= 150) return "#FF9800"; // Orange (Unhealthy for sensitive groups)
    return "#F44336"; // Red (Unhealthy)
  };

  // Determine trend circle color and icon
  const getTrendDetails = () => {
    switch (trend) {
      case "u": return { color: "#FF5722", icon: "▲" }; // Red, up arrow (Increasing)
      case "d": return { color: "#2196F3", icon: "▼" }; // Blue, down arrow (Decreasing)
      case "e": return { color: "#4CAF50", icon: "➤" }; // Green, stable (No change)
      default: return { color: "#9E9E9E", icon: "?" }; // Gray, unknown
    }
  };

  const trendDetails = getTrendDetails();
  const circleColor = getCircleColor();

  return (
    <Pressable style={styles.markerContainer} onPress={onPress}>
      {/* PM2.5 Value Circle */}
      <View style={[styles.pmCircle, { backgroundColor: circleColor }]}>
        <Text style={styles.pmValue}>{pm25}</Text>
      </View>

      {/* Trend Indicator */}
      <View style={[styles.trendCircle, { backgroundColor: trendDetails.color }]}>
        <Text style={styles.trendIcon}>{trendDetails.icon}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pmCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pmValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  trendCircle: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  trendIcon: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
});

export default PmMarker;
