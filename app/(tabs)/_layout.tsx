import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import HeaderTitle from '@/components/HeaderTitle';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background, // Adjust header background
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors[colorScheme ?? 'light'].text, // Adjust header title color
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Keep bottom bar position intact
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Yakkaw</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Image source={require('@/assets/images/Notification.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('@/assets/images/Settings.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerTitle: () => <HeaderTitle title="Maps" />, // Custom header title
        }}
      />
      <Tabs.Screen
        name="Ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="ranking.star" color={color} />,
          headerTitle: () => <HeaderTitle title="Ranking" />, // Custom header title
        }}
      />
      <Tabs.Screen
        name="Statistic"
        options={{
          title: 'Statistic',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="statistic.chart" color={color} />,
          headerTitle: () => <HeaderTitle title="Statistic" />, // Custom header title
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text, // Adjust to match the theme
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: 16, // Adds spacing between icons and screen edge
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});