import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Settings: undefined;
  About: undefined;
  ContactUs: undefined;
  FAQ: undefined;
  Start: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Settings">;

const Settings = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  useEffect(() => {
    // โหลดสถานะการแจ้งเตือนจาก AsyncStorage
    const loadNotificationStatus = async () => {
      const storedStatus = await AsyncStorage.getItem("notifications_enabled");
      if (storedStatus !== null) {
        setIsNotificationEnabled(JSON.parse(storedStatus));
      }
    };
    loadNotificationStatus();
  }, []);

  const toggleNotification = async () => {
    const newStatus = !isNotificationEnabled;
    setIsNotificationEnabled(newStatus);

    // บันทึกสถานะลงใน AsyncStorage
    await AsyncStorage.setItem("notifications_enabled", JSON.stringify(newStatus));

    if (newStatus) {
      // เปิดรับการแจ้งเตือน
      registerForPushNotifications();
      Alert.alert("Notifications Enabled", "You will receive notifications.");
    } else {
      // ปิดรับการแจ้งเตือน
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.NONE, // ปิดเสียงแจ้งเตือน
        showBadge: false,
      });
      Alert.alert("Notifications Disabled", "You will not receive notifications.");
    }
  };

  // ฟังก์ชันลงทะเบียนรับการแจ้งเตือน
  const registerForPushNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Permission Denied", "Cannot enable notifications without permission.");
        return;
      }
    }
    // ดำเนินการรับ token สำหรับ push notification
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push Notification Token:", token);

    // สามารถส่ง token ไปยัง backend เพื่อเก็บข้อมูลของ user และใช้ push notifications
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Notification Toggle */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="notifications" size={24} color="#333" />
          <Text style={styles.rowText}>Notification</Text>
        </View>
        <Switch value={isNotificationEnabled} onValueChange={toggleNotification} />
      </View>

      {/* Language Selection */}
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="language" size={24} color="#333" />
          <Text style={styles.rowText}>Language</Text>
        </View>
        <Text style={styles.rowText}>TH / EN</Text>
      </TouchableOpacity>

      {/* Select Location */}
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Start")}>
        <View style={styles.rowLeft}>
          <Icon name="place" size={24} color="#333" />
          <Text style={styles.rowText}>Select location</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#333" />
      </TouchableOpacity>

      {/* About Section */}
      <Text style={styles.sectionHeader}>About</Text>
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ContactUs")}>
        <View style={styles.rowLeft}>
          <Icon name="phone" size={24} color="#333" />
          <Text style={styles.rowText}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("FAQ")}>
        <View style={styles.rowLeft}>
          <Icon name="help-outline" size={24} color="#333" />
          <Text style={styles.rowText}>FAQ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("About")}>
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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#aaa",
    marginTop: 30,
  },
});
