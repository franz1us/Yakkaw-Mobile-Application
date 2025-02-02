// About.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      {/* <Text style={styles.header}>เกี่ยวกับเรา</Text> */}

      {/* About Section */}
      <View style={styles.section}>
        <Icon name="info-outline" size={30} color="#333" style={styles.icon} />
        <Text style={styles.description}>
          สมาคมยักษ์ขาวก่อตั้งขึ้นเพื่อเป็นตัวกลางในการตรวจติดตามปัญหาฝุ่นควันของประเทศไทย โดยเริ่มต้นจากจังหวัดเชียงราย และเครือข่ายจังหวัดในภาคเหนือ พร้อมทั้งแจกจ่ายอุปกรณ์วัดค่าฝุ่นเพื่อแจ้งเตือนประชาชนในพื้นที่ ในการเตรียมพร้อมรับมือ ตามหลักการธงสุขภาพ เพื่อสุขภาพอันดีของประชาชนชาวไทย ภายใต้สถานการณ์ฝุ่นควันพิษในอากาศ PM2.5
        </Text>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <Icon name="place" size={30} color="#333" style={styles.icon} />
        <Text style={styles.sectionTitle}>สถานที่ดำเนินการ</Text>
        <Text style={styles.description}>
          จังหวัดเชียงราย และเครือข่ายจังหวัดในภาคเหนือ
        </Text>
      </View>

      {/* Founded Section */}
      <View style={styles.section}>
        <Icon name="event" size={30} color="#333" style={styles.icon} />
        <Text style={styles.sectionTitle}>เริ่มต้นเมื่อ</Text>
        <Text style={styles.description}>
          29 ส.ค. 2562
        </Text>
      </View>

      {/* Version */}
      <Text style={styles.version}>Yakkaw 3.0.1</Text>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  version: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 20,
    textAlign: 'center',
  },
});