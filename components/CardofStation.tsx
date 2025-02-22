import { DataCardProps } from "@/constants/Ranking_Data";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from "react-native";

export const DataCard: React.FC<DataCardProps> = ({ title, value, unit, icon }) => (
  <View
    style={[styles.card, title === "Temperature" && styles.temperatureCard]}
  >
    {icon}
    <Text style={[styles.cardTitle]}>{title}</Text>
    <Text style={styles.cardValue}>
      {value}
      <Text style={styles.unit}> {unit}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
    card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    margin: 10,
    width: "28%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  unit: {
    fontSize: 12,
    color: "#666",
  },

  temperatureCard: {
    width: "28%", // Same as other cards
    paddingHorizontal: 12,
  },
});

