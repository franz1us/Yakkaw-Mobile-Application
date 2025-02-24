import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomDropDown from '../../components/ui/CustomDropDown';
import TimeRangeSelector from '@/components/ui/TimeRangeSelector';
import ChartComponent from '../../components/ui/ChartComponent';
import FullScreenChart from '../../components/ui/FullScreenChart';

const Statistic = () => {
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState(null);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });

  const sanitizeData = (data: number[]) => {
    return data.map((value) => (isNaN(value) || !isFinite(value) ? 0 : value));
  };

  const dataForChart = {
    "24 Hour": {
      labels: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'],
      datasets: [{ data: sanitizeData([30, 40, 50, 60, 70, 75, 80, 85, 90, 95, 100, 105]) }]
    }
  };

  useEffect(() => {
    if (selectedRanges.length === 0) return;

    let mergedLabels = dataForChart[selectedRanges[0]]?.labels || [];
    let mergedDatasets = selectedRanges.flatMap(range => dataForChart[range]?.datasets || []);

    const sanitizedDatasets = mergedDatasets.map(dataset => ({
      ...dataset,
      data: sanitizeData(dataset.data),
    }));

    setChartData((prevChartData) => {
      const newChartData = { labels: mergedLabels, datasets: sanitizedDatasets.length ? sanitizedDatasets : [{ data: [] }] };
      return JSON.stringify(prevChartData) === JSON.stringify(newChartData) ? prevChartData : newChartData;
    });
  }, [selectedRanges]);

  const toggleRangeSelection = useCallback((range: string) => {
    setSelectedRanges((prev) => {
      const newRanges = prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range];
      return JSON.stringify(newRanges) === JSON.stringify(prev) ? prev : newRanges; 
    });
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.aqiContainer}>
        <Text style={styles.aqiValue}>100</Text>
        <Text style={styles.aqiUnit}>ug/m³</Text>
      </View>

      <CustomDropDown open={provinceOpen} setOpen={setProvinceOpen} value={null} setValue={function (value: React.SetStateAction<string | null>): void {
        throw new Error('Function not implemented.');
      } } items={[]} />

      <ChartComponent chartData={chartData} onExpand={() => setModalVisible(true)} />

      <TimeRangeSelector selectedRanges={selectedRanges} toggleRangeSelection={toggleRangeSelection} />

      <FullScreenChart visible={modalVisible} onClose={() => setModalVisible(false)} data={chartData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  aqiContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aqiValue: { fontSize: 40, fontWeight: 'bold' },
  aqiUnit: { fontSize: 18 },
});

export default Statistic;
