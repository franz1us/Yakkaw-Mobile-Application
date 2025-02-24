import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TimeRangeSelectorProps {
  selectedRanges: string[];
  toggleRangeSelection: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selectedRanges, toggleRangeSelection }) => {
  const ranges = ['24 Hour', '1 Week', '1 Month', '3 Month', '1 Year'];

  return (
    <View style={styles.container}>
      {ranges.map((range) => (
        <TouchableOpacity
          key={range}
          style={[styles.button, selectedRanges.includes(range) && styles.activeButton]}
          onPress={() => toggleRangeSelection(range)}
        >
          <Text style={[styles.text, selectedRanges.includes(range) && styles.activeText]}>{range}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#4CAF50', // สีเขียวเมื่อเลือก
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
  activeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TimeRangeSelector;
