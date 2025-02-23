// IconSymbol.tsx
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type IconSymbolName =
  | 'home'
  | 'mapping'
  | 'ranking'
  | 'statistic'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right';

const MaterialMapping = {
  'home': 'house',
  'mapping': 'map',
  'ranking': 'format-list-bulleted',
  'statistic': 'bar-chart',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
};

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MaterialMapping[name]}
      style={style}
    />
  );
}
