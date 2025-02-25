import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const PmMarker = ({ pm25, trend, onPress }) => {
  // ฟังก์ชันกำหนดสีของหมุด
  const getMarkerStyle = () => {
    if (pm25 <= 20) return { background: "rgba(46, 168, 255, 0.9)", border: "#2EA8FF" };   // ฟ้า
    if (pm25 <= 50) return { background: "rgba(56, 176, 0, 0.9)", border: "#38B000" };     // เขียว
    if (pm25 <= 80) return { background: "rgba(240, 240, 0, 0.9)", border: "#F0F000" };   // เหลือง
    if (pm25 <= 150) return { background: "rgba(255, 165, 0, 0.9)", border: "#FFA500" };  // ส้ม
    return { background: "rgba(255, 87, 87, 0.9)", border: "#FF8787" };                  // แดง
  };

  // ฟังก์ชันกำหนดสีของ Trend Indicator
  const getTrendDetails = () => {
    switch (trend) {
      case "u": return { color: "#FF5722", icon: "▲" }; // ขึ้น (แดง)
      case "d": return { color: "#2196F3", icon: "▼" }; // ลง (น้ำเงิน)
      case "e": return { color: "#4CAF50", icon: "➤" }; // คงที่ (เขียว)
      default: return { color: "#9E9E9E", icon: "?" };  // ไม่ทราบ
    }
  };

  const markerStyle = getMarkerStyle();
  const trendDetails = getTrendDetails();

  return (
    <Pressable style={styles.markerContainer} onPress={onPress}>
      {/* PM2.5 Value Pin */}
      <View style={[styles.pmPin, { backgroundColor: markerStyle.background, borderColor: markerStyle.border }]}>
        <Text style={styles.pmValue}>{pm25}</Text>
      </View>

      {/* จุดแหลมของหมุด */}
      <View style={[styles.pinTip, { backgroundColor: markerStyle.border }]} />

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
  pmPin: {
    width: 50,
    height: 50,
    borderRadius: 25, // ทำให้ดูโค้งมนเป็นหมุด
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pmValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  pinTip: {
    width: 12,
    height: 12,
    backgroundColor: "red", // สีตาม Border ของหมุด
    position: "absolute",
    bottom: -5, // ทำให้เป็นจุดปลายหมุด
    transform: [{ rotate: "45deg" }], // หมุนให้เป็นจุดปลายแหลม
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
