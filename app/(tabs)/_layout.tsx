import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
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
          headerTitle: () => <HeaderTitle title="Home" />, // Custom header title
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
