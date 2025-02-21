import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ContactUs = () => {
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@yakkaw.com");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+66123456789");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      {/* Email Section */}
      <TouchableOpacity style={styles.section} onPress={handleEmailPress}>
        <Icon name="email" size={30} color="#333" style={styles.icon} />
        <Text style={styles.sectionTitle}>Email</Text>
        <Text style={styles.description}>support@yakkaw.com</Text>
      </TouchableOpacity>

      {/* Phone Section */}
      <TouchableOpacity style={styles.section} onPress={handlePhonePress}>
        <Icon name="phone" size={30} color="#333" style={styles.icon} />
        <Text style={styles.sectionTitle}>Phone</Text>
        <Text style={styles.description}>+66 061 265 0505</Text>
      </TouchableOpacity>

      {/* Address Section */}
      <View style={styles.section}>
        <Icon name="place" size={30} color="#333" style={styles.icon} />
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.description}>
          123 Yakkaw Street, Chiang Rai, Thailand 57000
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});
