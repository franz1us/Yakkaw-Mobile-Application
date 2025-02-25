import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, useColorScheme, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";

const HeaderActions = ({ goToNotification, goToSetting }) => (
  <View style={styles.headerIcons}>
    <TouchableOpacity onPress={goToNotification}>
      <Image source={require("@/assets/images/Notification.png")} style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={goToSetting}>
      <Image source={require("@/assets/images/Settings.png")} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const goToSetting = () => router.push("/Setting");
  const goToNotification = () => router.push("/Notification");

  const createScreenOptions = (title, iconName) => ({
    title,
    tabBarIcon: ({ color }) => <IconSymbol size={28} name={iconName} color={color} />,
    headerTitle: () => (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    ),
    headerRight: () => <HeaderActions goToNotification={goToNotification} goToSetting={goToSetting} />,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontSize: 18, fontWeight: "bold", color: Colors[colorScheme ?? "light"].text },
        tabBarStyle: Platform.select({ ios: { position: "absolute" }, default: {} }),
      }}
    >
      <Tabs.Screen name="Home" options={createScreenOptions("Home", "home")} />
      <Tabs.Screen name="Maps" options={createScreenOptions("Maps", "mapping")} />
      <Tabs.Screen name="Ranking" options={createScreenOptions("Ranking", "ranking")} />
      <Tabs.Screen name="Statistic" options={createScreenOptions("Statistic", "statistic")} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: Colors.light.text },
  headerIcons: { flexDirection: "row", marginRight: 16 },
  icon: { width: 24, height: 24, marginHorizontal: 8 },
});
