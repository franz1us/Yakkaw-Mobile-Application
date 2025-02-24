import React from 'react';
import { View, Modal, Dimensions, TouchableOpacity, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// กำหนด props type
interface FullScreenChartProps {
  visible: boolean;
  onClose: () => void;
  data: {
    labels: string[];
    datasets: { data: number[]; strokeWidth: number; color: (opacity: number) => string }[];
  };
}

const FullScreenChart: React.FC<FullScreenChartProps> = ({ visible, onClose, data }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <LineChart
          data={data}
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
        <TouchableOpacity style={{ marginTop: 20, padding: 10, backgroundColor: 'red' }} onPress={onClose}>
          <Text style={{ color: '#FFF' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FullScreenChart;
