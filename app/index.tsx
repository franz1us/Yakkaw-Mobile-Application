import { Image, StyleSheet, Platform, Button, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {
  const route = router;

  useEffect(()=>{
    const timer = setTimeout(()=>{
      route.push('/Start');
    },2000);

    return()=> clearTimeout(timer);
  },[route])
  return (
    <View style={styles.container}>
      <View style={styles.image_text}>
        <Image
          source={require('@/assets/images/yakkaw_icon.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Y A K K A W</Text>
        <Text style={styles.description}>สมาคมยักษ์ขาว</Text>
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
  image_text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  image: {
    width: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

