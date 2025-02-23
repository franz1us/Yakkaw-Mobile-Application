import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getPM25Status,
  getPM25Color,
  trendArrowStation,
  ConditionRankingStyles,
} from "@/components/ConditionForRanking";
import { DataCard } from "@/components/CardofStation";


const StationScreen = () => {
  const params = useLocalSearchParams();
  const station = JSON.parse(params.Station);
  const [isFavorite, setIsFavorite] = useState(false);
  const styleCondition = ConditionRankingStyles(station.pm25);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
<View style={styles.titleContainer}>
  <Text style={styles.title}>{station.place}</Text>
  <View style={styles.iconContainer}>
    <Text style={styles.trendIcon}>{trendArrowStation(station.trend)}</Text>
  </View>
</View>

    <View style={styles.locationContainer}>
      <Feather name="map-pin" size={16} color="#666" />
      <Text style={styles.locationText}>{station.address}</Text>
    </View>
  </View>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={28}
            color={isFavorite ? "#FF2C2C" : "#555"}
          />
        </TouchableOpacity>
      </View>

      {/* Main PM2.5 Status */}
      <View
        style={[
          styles.mainStatus,
          { backgroundColor: getPM25Color(station.pm25) },
        ]}
      >
        <Text
          style={[
            styles.statusTitle,
            {
              color: styleCondition.textColor,
            },
          ]}
        >
          Air Quality Status
        </Text>
        <Text
          style={[
            styles.statusValue,
            {
              color: styleCondition.textColor,
            },
          ]}
        >
          {station.pm25}
        </Text>
        <Text
          style={[
            styles.statusUnit,
            {
              color: styleCondition.textColor,
            },
          ]}
        >
          µg/m³
        </Text>
        <Text
          style={[
            styles.statusText,
            {
              color: styleCondition.textColor,
            },
          ]}
        >
          {getPM25Status(station.pm25)}
        </Text>
      </View>

      {/* PM Measurements Section */}
      <Text style={styles.sectionTitle}>Particulate Matter</Text>
      <View style={styles.gridContainer}>
        <DataCard
          title="PM10"
          value={station.pm10}
          unit=" µg/m³"
          icon={
            <MaterialCommunityIcons name="molecule" size={24} color="#666" />
          }
        />
        <DataCard
          title="PM2.5"
          value={station.pm25}
          unit=" µg/m³"
          icon={
            <MaterialCommunityIcons name="molecule" size={24} color="#666" />
          }
        />
        <DataCard
          title="PM100"
          value={station.pm100}
          unit=" µg/m³"
          icon={
            <MaterialCommunityIcons name="molecule" size={24} color="#666" />
          }
        />
      </View>

      {/* Averages Section */}
      <Text style={styles.sectionTitle}>Historical Averages</Text>
      <View style={styles.gridContainer}>
        <DataCard
          title="1 Hour"
          value={station.av1h}
          unit="µg/m³"
          icon={<Feather name="clock" size={24} color="#666" />}
        />
        <DataCard
          title="3 Hours"
          value={station.av3h}
          unit="µg/m³"
          icon={<Feather name="clock" size={24} color="#666" />}
        />
        <DataCard
          title="6 Hours"
          value={station.av6h}
          unit="µg/m³"
          icon={<Feather name="clock" size={24} color="#666" />}
        />
        <DataCard
          title="12 Hours"
          value={station.av12h}
          unit="µg/m³"
          icon={<Feather name="clock" size={24} color="#666" />}
        />
        <DataCard
          title="24 Hours"
          value={station.av24h}
          unit="µg/m³"
          icon={<Feather name="clock" size={24} color="#666" />}
        />
      </View>

      {/* Weather Section */}
      <Text style={styles.sectionTitle}>Weather Conditions</Text>
      <View style={styles.gridContainer}>
        <DataCard
          title="Temperature"
          value={station.temperature}
          unit="°C"
          icon={
            <MaterialCommunityIcons name="thermometer" size={24} color="#666" />
          }
        />
        <DataCard
          title="Humidity"
          value={station.humidity}
          unit="%"
          icon={
            <MaterialCommunityIcons
              name="water-percent"
              size={24}
              color="#666"
            />
          }
        />
        <DataCard
          title="Pressure"
          value={station.pres}
          unit="Psi"
          icon={<MaterialCommunityIcons name="gauge" size={24} color="#666" />}
        />
      </View>

      {/* Last Updated */}
      <View style={styles.footer}>
        <Feather name="refresh-cw" size={16} color="#666" />
        <Text style={styles.updatedText}>
          Last updated: {station.date}  {station.time}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  titleContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  mainStatus: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 16,

    opacity: 0.9,
  },
  statusValue: {
    fontSize: 48,
    fontWeight: "bold",

    marginVertical: 8,
  },
  statusUnit: {
    fontSize: 16,

    opacity: 0.9,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "600",

    marginTop: 4,
  },
  trendIcon: {
    fontSize: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  updatedText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  iconContainer: {
    marginTop: 2, 
  },
  
});

export default StationScreen;
