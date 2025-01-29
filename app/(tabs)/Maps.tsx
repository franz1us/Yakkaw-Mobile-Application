import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";

const API_URL = "https://your-api-endpoint.com/";

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

  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const selectMapType = (type: "standard" | "satellite" | "hybrid") => {
    setMapType(type);
    setShowMenu(false);
  };

  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 200 && data.response) {
          const today = format(new Date(), "yyyy-MM-dd"); // วันที่ปัจจุบันในรูปแบบ yyyy-MM-dd

          const filteredMarkers = data.response
            .filter((item) => {
              const itemDate = item.ddate ? item.ddate : null;

              return (
                item.status === "Active" &&
                item.latitude &&
                item.longitude &&
                item.ddate !== null &&
                item.dtime !== null &&
                item.timestamp !== null &&
                item.av24h !== null &&
                item.av12h !== null &&
                item.av6h !== null &&
                item.av3h !== null &&
                item.av1h !== null &&
                item.pm25 !== null &&
                item.pm10 !== null &&
                item.pm100 !== null &&
                item.aqi !== null &&
                item.temperature !== null &&
                item.humidity !== null &&
                item.pres !== null &&
                item.color !== null &&
                item.trend !== null &&
                itemDate === today // ตรวจสอบว่าเป็นวันที่เดียวกับวันนี้
              );
            })
            .map((item) => ({
              id: item.dvid,
              title: item.place,
              description: `PM2.5: ${item.pm25 ?? "N/A"} µg/m³`,
              coordinate: {
                latitude: item.latitude,
                longitude: item.longitude,
              },
              pm25: item.pm25 || 0,
              ddate: item.ddate, // เก็บค่าของ ddate ไว้ใน markers
              dtime: format(new Date(`${item.ddate} ${item.dtime}`), "hh:mm a"), // เก็บค่าของ dtime ไว้ใน markers
            }));

          setMarkers(filteredMarkers); // ใช้ markers ที่กรองแล้ว
        } else {
          Alert.alert("Error", "Failed to fetch markers data.");
        }
      } catch (error) {
        console.error("Error fetching markers:", error);
        Alert.alert("Error", "Unable to connect to the server.");
      }
    };

    fetchMarkers();
  }, []);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
  
        setRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Error", "Location not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search location.");
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        mapType={mapType}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.id}-${index}`}
            id={marker.deviceid}
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
              <View style={styles.customCallout}>
                {/* PM2.5 Circle */}
                <View
                  style={[
                    styles.pmCircle,
                    {
                      backgroundColor:
                        marker.pm25 <= 50
                          ? "green"
                          : marker.pm25 <= 100
                          ? "yellow"
                          : marker.pm25 <= 150
                          ? "orange"
                          : "red",
                    },
                  ]}
                >
                  <Text style={styles.pmValue}>{marker.pm25}</Text>
                </View>

                {/* Information Section */}
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{marker.title}</Text>
                  <Text style={styles.subtitle}>
                    {marker.ddate
                      ? `${marker.ddate} - ${marker.dtime}`
                      : "Date not available"}
                  </Text>

                  <Text style={styles.description}>
                    Quality of PM 2.5 is{" "}
                    {marker.pm25 <= 50
                      ? "Good"
                      : marker.pm25 <= 100
                      ? "Moderate"
                      : marker.pm25 <= 150
                      ? "Unhealthy"
                      : "Pretty Bad"}
                  </Text>
                </View>
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
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1000,
  },
  searchInput: {
    flex: 1,
    height: 35,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 5,
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
  customCallout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    width: 250,
  },
  pmCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pmValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
});
