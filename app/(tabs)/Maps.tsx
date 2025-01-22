import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";

const Maps = () => {
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid">(
    "standard"
  );
  const [showMenu, setShowMenu] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 4.0,
    longitudeDelta: 4.0,
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: "Bangkok",
      description: "PM2.5: 72 µg/m³",
      coordinate: { latitude: 13.7563, longitude: 100.5018 },
      pm25: 72,
    },
    {
      id: 2,
      title: "Chiang Mai",
      description: "PM2.5: 180 µg/m³",
      coordinate: { latitude: 18.7903, longitude: 98.986 },
      pm25: 180,
    },
    // Other markers...
  ]);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const selectMapType = (type: "standard" | "satellite" | "hybrid") => {
    setMapType(type);
    setShowMenu(false);
  };

  const moveToCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to use this feature."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to get current location.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
  style={styles.map}
  region={region}
  onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
  mapType={mapType}
>
  {markers.map((marker) => (
    <Marker
      key={marker.id}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
      pinColor={
        marker.pm25 <= 50
          ? "green"
          : marker.pm25 <= 100
          ? "yellow"
          : marker.pm25 <= 150
          ? "orange"
          : "red"
      }
    >
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>{marker.title}</Text>
          <Text style={styles.calloutText}>{marker.description}</Text>
          <Text style={styles.calloutText}>PM2.5 Level: {marker.pm25}</Text>
        </View>
      </Callout>
    </Marker>
  ))}
</MapView>


      {/* Map Type Button */}
      <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
        <Icon name="layers" size={30} color="black" />
      </TouchableOpacity>

      {/* GPS Button */}
      <TouchableOpacity
        style={styles.gpsButton}
        onPress={moveToCurrentLocation}
      >
        <Icon name="my-location" size={30} color="black" />
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => selectMapType("standard")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Standard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectMapType("satellite")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Satellite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectMapType("hybrid")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Hybrid</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.legend}>
        <View style={[styles.legendBar, { backgroundColor: "green" }]} />
        <Text style={styles.legendLabel}>Good</Text>

        <View style={[styles.legendBar, { backgroundColor: "yellow" }]} />
        <Text style={styles.legendLabel}>Moderate</Text>

        <View style={[styles.legendBar, { backgroundColor: "orange" }]} />
        <Text style={styles.legendLabel}>Unhealthy</Text>

        <View style={[styles.legendBar, { backgroundColor: "red" }]} />
        <Text style={styles.legendLabel}>Hazardous</Text>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  iconButton: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "rgba(255,255,255, 0.7)",
    padding: 5,
    borderRadius: 50,
    zIndex: 999,
  },
  gpsButton: {
    position: "absolute",
    bottom: 60,
    right: 10,
    backgroundColor: "rgba(255,255,255, 0.7)",
    padding: 5,
    borderRadius: 50,
    zIndex: 999,
  },
  menu: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  legend: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  legendBar: {
    width: 30,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 10,
    color: "#333",
    marginHorizontal: 5,
  },
  callout: {
    width: 150,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 14,
    color: "#555",
  },
  
});
