import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HeaderTitle = ({ title }: { title: string }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

export default HeaderTitle
  
  const styles = StyleSheet.create({
    headerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff', // Customize as needed
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });