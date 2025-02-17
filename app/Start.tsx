import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import useRanking from "@/hooks/useRanking";

const Start: React.FC = () => {
  const { filteredData, loading, error } = useRanking();

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const renderItem = ({ item }: { item: { pid: string; place: string } }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => route.push(`/back/Home`)}
      // onPress={() => route.push(`/location/${item.id}`)}
    >
      <Text style={styles.locationName}>{item.place}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("@/assets/images/yakkaw_icon.png")}
          style={styles.icon}
        />
        <View style={styles.topText}>
          <Text style={styles.name}>YAKKAW</Text>
          <Text style={styles.name_thai}>สมาคมยักษ์ขาว</Text>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.middleTitle}>Select Location Default</Text>
        <Text style={styles.middleDescription}>To set as default</Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.pid}
      />
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
    top: 30,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 16,
  },
  topText: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "400",
    color: "#333",
  },
  name_thai: {
    fontSize: 18,
    color: "#333",
  },
  middleSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  middleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  middleDescription: {
    fontSize: 14,
    color: "#007BFF",
  },
  locationItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
