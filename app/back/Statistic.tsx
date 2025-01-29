import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';

const data = {
  province: [
    { label: 'Chiang Rai', value: 'Chiang Rai' },
    { label: 'Chiang Mai', value: 'Chiangmai' },
    { label: 'Mae Hong Son', value: 'Mae Hong Son' },
    { label: 'Phrae', value: 'Phrae' },
  ],
  time: [
    { label: '01:00 PM', value: '01:00' },
    { label: '03:00 AM', value: '03:00' },
    { label: '05:00 AM', value: '05:00' },
    { label: '07:00 AM', value: '07:00' },
    { label: '09:00 AM', value: '09:00' },
  ],
};

const DropdownComponent = () => {
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState(null);
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(null);


  const dataForChart = {
    labels: [
      '1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00',
      '17:00', '19:00', '21:00', '23:00',
    ],
    datasets: [
      {
        data: [45, 30, 60, 80, 55, 75, 45, 30, 70, 90, 50, 60],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
    ],
  };

  const minNow = 45;
  const maxNow = 45;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Dropdown
          open={provinceOpen}
          setOpen={setProvinceOpen}
          value={provinceValue}
          setValue={setProvinceValue}
          items={data.province}
          placeholder="Pro"
          iconName="Safety"
        />
        <Dropdown
          open={timeOpen}
          setOpen={setTimeOpen}
          value={timeValue}
          setValue={setTimeValue}
          items={data.time}
          placeholder="Time"
          iconName="clockcircleo"
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>24-Hour PM2.5 Levels</Text>
        <LineChart
          data={dataForChart}
          width={380}
          height={260}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f0f0f0',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4CAF50',
            },
          }}
          bezier
          style={styles.graphStyle}
        />
      </View>
      <View style={styles.valueContainer}>
        <View style={styles.valueBox}>
          <Text style={styles.valueTitle}>Min. Now</Text>
          <Text style={styles.valueNumber}>{minNow}</Text>
          <Text style={styles.valueUnit}>µg/m³</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueTitle}>Max. Now</Text>
          <Text style={styles.valueNumber}>{maxNow}</Text>
          <Text style={styles.valueUnit}>µg/m³</Text>
        </View>
      </View>
    </View>
  );
};

const Dropdown = ({ open, setOpen, value, setValue, items, placeholder, iconName }) => (
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    placeholder={placeholder}
    searchable={true}
    listMode="SCROLLVIEW" 
    style={styles.customDropdown}
    placeholderStyle={styles.customPlaceholderStyle}
    textStyle={styles.customSelectedTextStyle}
    dropDownContainerStyle={styles.customDropDownContainerStyle}
    renderLeftIcon={() => (
      <AntDesign
        style={styles.customIcon}
        color="black"
        name={iconName}
        size={18}
      />
    )}
  />
);

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
  customDropdown: {
    width: '40%',
    height: 50,
    backgroundColor: '#F4F4F4',
    borderWidth: 0,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 1,
  },
  customPlaceholderStyle: {
    fontSize: 15,
    color: 'gray',
  },
  customSelectedTextStyle: {
    fontSize: 17,
    color: 'black',
  },
  customDropDownContainerStyle: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  customIcon: {
    marginRight: 8, 
  },
  chartContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graphStyle: {
    borderRadius: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  valueBox: {
    backgroundColor: '#FFFFFF',
    width: 140,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  valueNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50', 
  },
  valueUnit: {
    fontSize: 14,
    color: 'gray',
  },
});

export default DropdownComponent;
