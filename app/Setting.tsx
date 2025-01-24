import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // ไอคอนที่ต้องการ

const Settings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = React.useState(true);

  const toggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Notification */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="notifications" size={24} color="#333" />
          <Text style={styles.rowText}>Notification</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
        />
      </View>

      {/* Language */}
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="language" size={24} color="#333" />
          <Text style={styles.rowText}>Language</Text>
        </View>
        <Text style={styles.rowText}>TH / EN</Text>
      </TouchableOpacity>

      {/* Select Location */}
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="place" size={24} color="#333" />
          <Text style={styles.rowText}>Select location</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#333" />
      </TouchableOpacity>

      {/* About Section */}
      <Text style={styles.sectionHeader}>About</Text>
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="phone" size={24} color="#333" />
          <Text style={styles.rowText}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="help-outline" size={24} color="#333" />
          <Text style={styles.rowText}>FAQ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="info-outline" size={24} color="#333" />
          <Text style={styles.rowText}>About Yakkaw</Text>
        </View>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.version}>Yakkaw 3.0.1</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginTop: 30,
  },
});
