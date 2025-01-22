import { Image, StyleSheet, Platform, Button, Text, View, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function HomeScreen() {
  const route = router;
  return (
    <View style={styles.container}>
      <View style={styles.image_text}>
        <Image
        source={require('@/assets/images/yakkaw_icon.png')} 
        style={styles.image}
        />
        <Text style={styles.text}>Y A K K A W</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => route.push('/Start')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#F9FAFB', 
  },
  image_text:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:0,
    margin:0,
  },
  image: {
    width: 300,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 0,
    fontWeight:'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center', 

  },
  button: {
    backgroundColor: '#007BFF', // Primary color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Slightly rounded corners for the button
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // White text for contrast
    fontWeight: '600',
    textAlign: 'center',
  },
});
