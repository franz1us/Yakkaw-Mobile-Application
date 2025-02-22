import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AirQualityCard from "./AirQualityCard";

const AirQualityCardContainer = ({ selectedMarker, setSelectedMarker }) => {
  if (!selectedMarker) return null;

  return (
    <View style={styles.cardContainer}>
      <AirQualityCard
        
        pm25={selectedMarker?.pm25 ?? 0}
        temperature={selectedMarker?.temperature ?? 0}
        humidity={selectedMarker?.humidity ?? 0}
        location={selectedMarker?.title ?? "Unknown"}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    bottom: 80,
    left: 15,
    right: 15,
    padding: 5,
  }
});

export default AirQualityCardContainer;
