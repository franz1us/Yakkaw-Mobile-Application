import React, { memo } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// ✅ กำหนด Type ของ Props
interface ChartComponentProps {
  chartData: {
    labels: string[];
    datasets: { data: number[] }[];
  };
  onExpand: () => void;
}

// ✅ ฟังก์ชันช่วยกรองค่าที่ผิดพลาด
const sanitizeData = (data: number[]) => {
  return data.map((value) => (isNaN(value) || !isFinite(value) ? 0 : value));
};

const ChartComponent: React.FC<ChartComponentProps> = memo(({ chartData, onExpand }) => {
  const safeChartData = {
    labels: chartData?.labels ?? [],
    datasets: chartData?.datasets?.length
      ? chartData.datasets.map((dataset) => ({
          ...dataset,
          data: sanitizeData(dataset.data), 
        }))
      : [{ data: [0] }], 
  };

  return (
    <View>
      <LineChart
        data={safeChartData} 
        width={Dimensions.get('window').width * 0.9}
        height={500}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
      />
      <TouchableOpacity onPress={onExpand}>
        <Text>Expand</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ChartComponent;
