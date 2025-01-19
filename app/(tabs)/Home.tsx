import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      {/* Main AQI Section */}
      <View style={styles.aqiContainer}>
        <Text style={styles.locationText}>Chiang Rai</Text>
        <Text style={styles.aqiText}>6-hour average</Text>
        <Text style={styles.aqiValue}>27.25 µg/m³</Text>
        <View style={styles.aqiLevels}>
          {['#1E90FF', '#32CD32', '#FFFF00', '#FFA500', '#FF0000'].map((color, index) => (
            <View key={index} style={[styles.levelBox, { backgroundColor: color }]} />
          ))}
        </View>
      </View>

      {/* Nearby Stations Section */}
      <View style={styles.stationCard}>
        <View style={styles.stationHeader}>
          <Text style={styles.stationTemp}>30°C</Text>
          <Text style={styles.stationAqi}>34 µg/m³</Text>
        </View>
        <Text style={styles.stationName}>Bunyawat Wittayalai School</Text>
        <Text style={styles.stationAddress}>
          Rob Wiang Sub-district, Mueang District, Chiang Rai
        </Text>
        <View style={styles.stationAqiDetails}>
          {['33', '32', '33'].map((val, index) => (
            <Text key={index} style={styles.aqiValueSmall}>{val}</Text>
          ))}
        </View>
        <Text style={styles.stationUpdate}>
          Data as of 2024-10-09, Time 12:56
        </Text>
      </View>

      {/* Recommendations Section */}
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationHeader}>Recommendations</Text>
        <Text style={styles.generalRecommendation}>
          <Text style={styles.boldText}>(General Public)</Text> You can carry on activities as usual.
        </Text>
        <Text style={styles.sensitiveRecommendation}>
          <Text style={styles.boldText}>(Sensitive Groups)</Text> Limit outdoor activities or physical exertion. Be aware of dust exposure.
        </Text>
      </View>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  aqiContainer: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#EAF8E6',
    padding: 16,
    borderRadius: 16,
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  aqiText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  aqiValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  aqiLevels: {
    flexDirection: 'row',
    marginTop: 12,
  },
  levelBox: {
    width: 24,
    height: 24,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  stationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stationTemp: {
    fontSize: 20,
    color: '#666',
  },
  stationAqi: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  stationAddress: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  stationAqiDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  aqiValueSmall: {
    fontSize: 14,
    color: '#4CAF50',
  },
  stationUpdate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  recommendationContainer: {
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
  },
  recommendationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  generalRecommendation: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  sensitiveRecommendation: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});