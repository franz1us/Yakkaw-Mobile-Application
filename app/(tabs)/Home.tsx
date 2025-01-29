import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {
  const airQualityData = {
    location: 'Bunyawat Wittayalai School',
    address: 'Rob Wiang Sub-district, Mueang District, Chiang Rai',
    temperature: '30°C',
    currentAqi: '35',
    oneHourAqi: '33',
    threeHourAqi: '32',
    aqiRating: 'good', // Assuming 34 is in the 'good' range
  };

  const getAqiColor = (aqi) => {
    // Define color mapping based on AQI values
    if (aqi <= 50) {
      return '#2EA8FF';
    } else if (aqi <= 100) {
      return '#51D911';
    } else if (aqi <= 150) {
      return '#F0F000';
    } else if (aqi <= 200) {
      return '#FFA500';
    } else {
      return '#FF2C2C';
    }
  };

  const getAqiRating = (aqi) => {
    // Define text labels based on AQI values
    if (aqi <= 50) {
      return 'Good';
    } else if (aqi <= 100) {
      return 'Moderate';
    } else if (aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi <= 200) {
      return 'Unhealthy';
    } else {
      return 'Very Unhealthy';
    }
  };

  const getStarRating = (aqi) => {
    // Define Star Rating based on AQI values
    if (aqi <= 50) {
      return 5;
    } else if (aqi <= 100) {
      return 4;
    } else if (aqi <= 150) {
      return 3;
    } else if (aqi <= 200) {
      return 2;
    } else {
      return 1;
    }
  }
  const renderStars = () => {
    const starCount = getStarRating(airQualityData.currentAqi); // Adjust based on your rating logic
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<AntDesign name="star" size={16} color={getAqiColor(airQualityData.currentAqi)} key={i} />);
    }
    return stars;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Main AQI Section */}
      <View style={styles.aqiSetContainer}>
        <View style={styles.aqiContainer}>
          <Text style={styles.locationText}>Chiang Rai</Text>
          <Text style={styles.aqiText}>6-hour average</Text>
          <Text style={styles.aqiValue}>27.25</Text>
          <Text style={styles.aqiWValue}>µg/m³</Text>
        </View>
      </View>
      
      {/* AQI Levels */}
      <View style={styles.aqiLevels}>
          {[
            { color: '#1E90FF', value: '2' },
            { color: '#32CD32', value: '2' },
            { color: '#FFFF00', value: '0' },
            { color: '#FFA500', value: '0' },
            { color: '#FF0000', value: '0' },
          ].map((item, index) => (
            <View key={index} style={[styles.levelBox, { backgroundColor: item.color }]}>
              <Text style={styles.levelText}>{item.value}</Text>
            </View>
          ))}
      </View>
      <View style={styles.nbContain}>
        <Text style={styles.headerText}>Nearby stations</Text>
        <View style={styles.stationCard}>
            <View style={styles.lsContain}>
              <View style={[styles.stationAQI, { backgroundColor: getAqiColor(airQualityData.currentAqi) }]}>
                <Text style={styles.stationAQIUnit}>{airQualityData.temperature}</Text>
                <Text style={styles.stationAQIValue}>{airQualityData.currentAqi}</Text>
                <Text style={styles.stationAQIUnit}>µg/m³</Text>
              </View>
            </View>
            <View style={styles.stationCardContent}>
              <View style={styles.stationHeaderContent}>
                <Text style={styles.stationName}>{airQualityData.location}</Text>
                <Text style={styles.stationAddress}>{airQualityData.address}</Text>
              </View>
              <View style={styles.stationHistory}>
                <View style={styles.stationHistoryContain}>
                  <Text style={[styles.stationHistoryValue, { color: getAqiColor(airQualityData.currentAqi) }]}>{airQualityData.currentAqi}</Text>
                  <Text style={styles.stationHistoryLabel}>Current</Text>
                </View>
                <View style={styles.stationHistoryContain}>
                  <Text style={[styles.stationHistoryValue, { color: getAqiColor(airQualityData.currentAqi) }]}>{airQualityData.oneHourAqi}</Text>
                  <Text style={styles.stationHistoryLabel}>1 hours</Text>
                </View>
                <View style={styles.stationHistoryContain}>
                  <Text style={[styles.stationHistoryValue, { color: getAqiColor(airQualityData.currentAqi) }]}>{airQualityData.threeHourAqi}</Text>
                  <Text style={styles.stationHistoryLabel}>3 hours</Text>
                </View>
              </View>
              <View style={styles.stationRating}>
                {renderStars()}
              </View>
              <View style={styles.setnbText}>
                <Text style={[styles.stationDataTime, {color: '#2196F3'}]}>Data as of</Text>
                <Text style={[styles.stationDataTime, {color: '#111111'}]}>2024-10-09,</Text>
                <Text style={[styles.stationDataTime, {color: '#2196F3'}]}>Time</Text>
                <Text style={[styles.stationDataTime, {color: '#111111'}]}>12:56</Text>
              </View>
            </View>
          </View>
        </View>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  aqiSetContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aqiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Set the circle's width
    height: 200, // Set the circle's height
    borderRadius: 100, // Make it circular
    backgroundColor: '#46DA01', // Green background
    borderWidth: 8, // Create the outer border effect
    borderColor: 'rgba(70, 218, 1, 0.6)', // Light green for border
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0, // Add depth with shadow
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  aqiText: {
    fontSize: 16,
    color: '#FFFFFF', // White text
    marginVertical: 4,
    textAlign: 'center',
  },
  aqiValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  aqiWValue: {
    fontSize: 16,
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  aqiLevels: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30, // Space between circle and levels
  },
  levelBox: {
    width: 55,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lsContain:{},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  nbContain: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  insContain: {
  },
  stationCard: {
    flexDirection:'row',
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 16,
  },
  stationCardContent: {
    // ... styling for station card content ...
    flexDirection: 'column',
    flex:1,
  },
  stationHeaderContent: {
    flexDirection: 'column',
    // backgroundColor: 'gray',
    marginHorizontal: 16,
    marginVertical: 5,
  },
  stationName: {
    textAlign:'right',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stationAddress: {
    textAlign:'right',
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  stationAQI: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#000000',
    flex: 1,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0.2, // Add depth with shadow
  },
  stationAQIValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 4,
    color: 'white',
  },
  stationAQIUnit: {
    fontSize: 16,
    color: 'white',
  },
  stationHistory: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  stationHistoryContain: {
    alignContent: 'center',
    alignItems: 'center',
  },
  stationHistoryLabel: {
    fontSize: 14,
    color: '#111111',
    marginRight: 10
  },
  stationHistoryValue: {
    fontSize: 16,
    fontWeight: 'bold', 
    marginRight: 10
  },
  stationRating: {
    // ... styling for star rating ...
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  stationDataTime: {
    fontSize: 10,
    textAlign:'center',
    marginHorizontal: 4,
  },
    // color: '#2196F3',
  setnbText: {
    marginHorizontal:5,
    marginVertical:5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});