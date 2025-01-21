import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Statistic = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const provinces = [
    { label: 'Bangkok', value: 'bangkok' },
    { label: 'Chiang Mai', value: 'chiangmai' },
    { label: 'Chiang Rai', value: 'chiangrai' },
  ];

  const times = [
    { label: '08:00-09:00', value: '08:00-09:00' },
    { label: '09:00-10:00', value: '09:00-10:00' },
    { label: '10:00-11:00', value: '10:00-11:00' },
    { label: '11:00-12:00', value: '11:00-12:00' },
    { label: '13:00-14:00', value: '13:00-14:00' },
    { label: '14:00-15:00', value: '14:00-15:00' },
    { label: '15:00-16:00', value: '15:00-16:00' },
  ];
  
  return (
    <View style={styles.container}>
    
      <View style={styles.rowContainer}>
        <View style={styles.smallDropdownContainer}>
          <Text style={styles.label}>Provinces</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedProvince(value)}
            items={provinces}
            placeholder={{ label: 'Provinces', value: null }}
            style={{
              inputIOS: styles.smallInput, 
              inputAndroid: styles.smallInput, 
            }}
          />
        </View>

        <View style={styles.smallDropdownContainer}>
          <Text style={styles.label}>Time</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedTime(value)}
            items={times}
            placeholder={{ label: 'Time', value: null }}
            style={{
              inputIOS: styles.smallInput, 
              inputAndroid: styles.smallInput, 
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  smallDropdownContainer: {
    flex: 1,
    marginHorizontal: 9,
  },
  label: {
    fontSize: 14, 
    marginBottom: 4,
    color: '#333',
  },
  smallInput: {
    backgroundColor: '#f4f4f4',
    padding: 4, 
    height: 30,
    borderRadius: 36, 
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    fontSize: 4, 
  },
  contentText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
}); 