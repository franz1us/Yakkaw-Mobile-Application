import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const notifications = [
  {
    id: '1',
    title: 'Air Quality Update',
    message: 'PM 2.5 levels are high in your area. Please wear a mask.',
    time: '2 hours ago',
    icon: require('@/assets/images/air-quality.png'),
  },
  {
    id: '2',
    title: 'Maintenance Alert',
    message: 'Scheduled maintenance for sensor XYZ on Jan 25.',
    time: '1 day ago',
    icon: require('@/assets/images/maintainance.png'),
  },
  {
    id: '3',
    title: 'Weather Alert',
    message: 'Heavy rainfall expected tomorrow. Stay safe.',
    time: '3 days ago',
    icon: require('@/assets/images/rainy.png'),
  },
];

const Notification = () => {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
