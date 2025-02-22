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
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";
import PmMarker from "@/components/PmMarker";
import AirQualityCardContainer from "@/components/AirQualityCardContainer";
import { LocationObjectCoords } from "expo-location";
import LottieView from "lottie-react-native";

const API_URL = "";

const Maps = () => {
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid">(
    "standard"
  );
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [region, setRegion] = useState<Region>({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 4.0,
    longitudeDelta: 4.0,
  });

  const closeAirQualityCard = () => {
    setSelectedMarker(null);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // State สำหรับควบคุมการขยาย Search Bar

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const selectMapType = (type: "standard" | "satellite" | "hybrid") => {
    setMapType(type);
    setShowMenu(false);
  };
  const [currentLocation, setCurrentLocation] =
    useState<LocationObjectCoords | null>(null);

  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 200 && data.response) {
          const today = format(new Date(), "yyyy-MM-dd");

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
                itemDate === today
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
              pm25: item.pm25 ?? 0,
              pm10: item.pm10 ?? 0,
              temperature: item.temperature ?? "N/A",
              humidity: item.humidity ?? "N/A",
              ddate: item.ddate,
              dtime: format(new Date(`${item.ddate} ${item.dtime}`), "hh:mm a"),
              trend: item.trend,
              color: item.color ?? "N/A",
            }));

          setMarkers(filteredMarkers);
        } else {
          Alert.alert("Error", "Failed to fetch markers data.");
        }
      } catch (error) {
        console.error("Error fetching markers:", error);
        Alert.alert("Error", "Unable to connect to the server.");
      }
    };

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to use this feature."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    fetchMarkers();
    getLocation();
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
    <TouchableWithoutFeedback onPress={closeAirQualityCard}>
      <View style={styles.container}>
        {/* Search Input */}
        <View
          style={[
            styles.searchContainer,
            isSearchExpanded ? styles.searchExpanded : styles.searchCollapsed,
          ]}
        >
          {isSearchExpanded && (
            <TextInput
              style={styles.searchInput}
              placeholder="Enter location"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (isSearchExpanded) {
                handleSearch();
              }
              setIsSearchExpanded((prev) => !prev);
            }}
          >
            <Icon name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          mapType={mapType}
        >
          {currentLocation && (
            <Marker coordinate={currentLocation} title="Your Location">
              <LottieView
                source={require("@/assets/animations/location.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </Marker>
          )}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                if (
                  marker &&
                  marker.pm25 !== undefined 
                ) {
                  setSelectedMarker(marker);
                } else {
                  console.error("Invalid marker data:", marker);
                }
              }}
            >
              <PmMarker pm25={marker.pm25} trend={marker.trend} />
            </Marker>
          ))}
        </MapView>
        <AirQualityCardContainer
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />

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

        {!selectedMarker && (
          <View style={styles.legend}>
            <View style={[styles.legendBar, { backgroundColor: "#508C9B" }]} />
            <Text style={styles.legendLabel}>Excellent</Text>
            <View style={[styles.legendBar, { backgroundColor: "#4CAF50" }]} />
            <Text style={styles.legendLabel}>Good</Text>
            <View style={[styles.legendBar, { backgroundColor: "#FFEB3B" }]} />
            <Text style={styles.legendLabel}>Moderate</Text>
            <View style={[styles.legendBar, { backgroundColor: "#FF9800" }]} />
            <Text style={styles.legendLabel}>Unhealthy</Text>
            <View style={[styles.legendBar, { backgroundColor: "#F44336" }]} />
            <Text style={styles.legendLabel}>Danger</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1000,
  },
  searchExpanded: {
    width: 200,
    paddingHorizontal: 10,
  },
  searchCollapsed: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    top: 150,
    right: 20,
    backgroundColor: "rgba(255,255,255, 0.7)",
    padding: 5,
    borderRadius: 50,
    zIndex: 999,
  },
  gpsButton: {
    position: "absolute",
    top: 100,
    right: 20,
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
    bottom: 90,
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
    width: 25,
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
