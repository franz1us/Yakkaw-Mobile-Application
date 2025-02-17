import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';

const App = () => {
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState(null);
  const [selectedRange, setSelectedRange] = useState('24 Hour');

  const dataForChart = {
    labels: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'],
    datasets: [
      {
        data: [50, 70, 30, 90, 40, 100, 60, 80, 50, 75, 40, 90],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
    ],
  };

  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      nestedScrollEnabled={true}
      ListHeaderComponent={
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.aqiValue}>100<Text style={styles.aqiUnit}> ug/m³</Text></Text>
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={provinceOpen}
                value={provinceValue}
                items={[
                  { label: 'Chiang Rai', value: 'Chiang Rai' },
                  { label: 'Chiang Mai', value: 'Chiangmai' },
                  { label: 'Mae Hong Son', value: 'Mae Hong Son' },
                  { label: 'Phrae', value: 'Phrae' },
                ]}
                setOpen={setProvinceOpen}
                setValue={setProvinceValue}
                placeholder="Province"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropDownContainer}
                renderLeftIcon={() => (
                  <AntDesign style={styles.icon} name="enviromento" size={18} color="black" />
                )}
              />
            </View>
          </View>

          <Text style={styles.aqiSubtitle}>
            <Text style={{ fontWeight: 'bold' }}>PM 2.5</Text> : 21 NOV 2024 - 11.34 AM
          </Text>

          <View style={styles.chartContainer}>
  <LineChart
    data={dataForChart}
    width={350} 
    height={260}
    chartConfig={{
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,

      color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

      propsForLabels: {
        fontSize: 8, 
        fontWeight: '400', 
        fontFamily: 'Arial', 
        color: '#333', 
      },

      propsForDots: {
        r: (dotIndex) => (dotIndex === 5 ? '8' : '3'),
        strokeWidth: '2',
        stroke: (dotIndex) => (dotIndex === 5 ? 'black' : '#4CAF50'),
      },
    }}
    bezier
    style={styles.chart}
  />
</View>


      
          <View style={styles.timeFilter}>
            {['24 Hour', '1 Week', '1 Month', '3 Month', '1 Year'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[styles.timeButton, selectedRange === range && styles.activeTimeButton]}
                onPress={() => setSelectedRange(range)}
              >
                <Text style={[styles.timeText, selectedRange === range && styles.activeTimeText]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 24-Hour Report */}
          <View style={styles.reportContainer}>
            <Text style={styles.reportTitle}>24-Hour Report</Text>

            <View style={styles.cardContainer}>
              {[
                { time: '7.00', level: 45, status: 'Now is great', color: '#72E672', temp: 33 },
                { time: '8.00', level: 60, status: 'Please Careful', color: '#FFD966', temp: 30 },
                { time: '9.00', level: 90, status: 'Pretty Bad', color: '#FF6666', temp: 27 },
              ].map((item) => (
                <View key={item.time} style={styles.reportCard}>
                  <Text style={styles.reportTime}>At {item.time}</Text>
                  <Text style={styles.reportStatus}>{item.status}</Text>
                  <View style={[styles.aqiBox, { backgroundColor: item.color }]}>
                    <Text style={styles.reportLevel}>{item.level}</Text>
                    <Text style={styles.reportUnit}>µg/m³</Text>
                  </View>
                  <Text style={styles.reportTemp}>{item.temp} °C</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  // **Header & Dropdown**
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20
  },
  
  aqiValue: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 25
  },

  aqiUnit: {
    fontSize: 18,
    fontWeight: '400'
    
  },

  aqiSubtitle: {
    fontSize: 13,
    color: 'gray',
    marginLeft: 22,
    marginBottom: 25
  },

  dropdownContainer: {
    width: '40%',
    alignItems: 'flex-end'
  },

  dropdown: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    elevation: 3,
    paddingLeft: 20
  },

  dropDownContainer: {
    backgroundColor: '#FFF'
  },

  icon: { 
    marginRight: 8
  },

  // **Chart **
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 10
    
  },

  chart: {
    width: '80%',
    borderRadius: 16
  },

  // **Time Range Buttons**
  timeFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  timeButton: {
    padding: 9,
    marginHorizontal: 7,
    backgroundColor: '#EAEAEA',
    borderRadius: 9
  },

  activeTimeButton: {
    backgroundColor: '#87CEFA'
  },

  timeText: {
    color: '#000'
  },

  activeTimeText: {
    color: '#FFF'
  },

  // **24-Hour Report**
  reportContainer: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center'
  },

  reportTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportCard: {
    backgroundColor: '#FFF',
    width: 110,
    height: 160,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    elevation: 3
  },

  reportTime: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 2
    
    
    
    
  },

  reportStatus: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 13
    
  },

  aqiBox: {
    width: 80,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  reportLevel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },

  reportUnit: {
    fontSize: 25,
    color: '#FFF'
    
  },

  reportTemp: {
    fontSize: 20,
    color: 'gray'
    
  },
});

export default App;