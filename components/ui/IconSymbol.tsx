// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  'home': 'home',
  'mapping': 'room',
  'ranking': 'format-list-bulleted',
  'statistic': 'bar-chart',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as const;




export type IconSymbolName =
  | 'home'
  | 'mapping'
  | 'ranking'
  | 'statistic'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right';

  export function IconSymbol({
    name,
    size = 24,
    color,
    style,
  }: {
    name: IconSymbolName; // Ensure it's explicitly typed
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<ViewStyle>;
    weight?: SymbolWeight;
  }) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} />;
  }
  
