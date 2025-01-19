// path: src/components/Maps.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const Maps = () => {
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'hybrid'>('standard');
  const [showMenu, setShowMenu] = useState(false); // Toggle for dropdown menu
  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: 'Bangkok',
      description: 'PM2.5: 72 µg/m³',
      coordinate: { latitude: 13.7563, longitude: 100.5018 },
      pm25: 72,
    },
    {
      id: 2,
      title: 'Chiang Mai',
      description: 'PM2.5: 180 µg/m³',
      coordinate: { latitude: 18.7903, longitude: 98.9860 },
      pm25: 180,
    },
    {
      id: 3,
      title: 'Phuket',
      description: 'PM2.5: 45 µg/m³',
      coordinate: { latitude: 7.8804, longitude: 98.3923 },
      pm25: 45,
    },
    {
      id: 4,
      title: 'Ayutthaya',
      description: 'PM2.5: 110 µg/m³',
      coordinate: { latitude: 14.3544, longitude: 100.5686 },
      pm25: 110,
    },
    {
      id: 5,
      title: 'Hat Yai',
      description: 'PM2.5: 35 µg/m³',
      coordinate: { latitude: 6.9934, longitude: 100.4685 },
      pm25: 35,
    },
  ]);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const selectMapType = (type: 'standard' | 'satellite' | 'hybrid') => {
    setMapType(type);
    setShowMenu(false); // Close the menu after selection
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 4.0,
          longitudeDelta: 4.0,
        }}
        mapType={mapType}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pm25 <= 50 ? 'green' : marker.pm25 <= 100 ? 'yellow' : 'red'}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
        <Icon name="layers" size={30} color="white" />
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => selectMapType('standard')} style={styles.menuItem}>
            <Text style={styles.menuText}>Standard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectMapType('satellite')} style={styles.menuItem}>
            <Text style={styles.menuText}>Satellite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectMapType('hybrid')} style={styles.menuItem}>
            <Text style={styles.menuText}>Hybrid</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  iconButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 50,
    zIndex: 999,
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
