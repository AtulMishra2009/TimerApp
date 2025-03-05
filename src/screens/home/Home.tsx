// import { Button, StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function Home() {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
  
//   )
// }

// const styles = StyleSheet.create({})

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const storedTimers = await AsyncStorage.getItem('timers');
        if (storedTimers) {
          setTimers(JSON.parse(storedTimers));
        }
      } catch (error) {
        console.error('Error loading timers:', error);
      }
    };

    fetchTimers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.banner}>Welcome to the Plan App</Text>
      
      <Button title="New Button" onPress={() => navigation.navigate('AddTimerScreen')} />
      
      <Text style={styles.heading}>Your Timers:</Text>
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.timerItem}>
            <Text style={styles.timerText}>{item.name} - {item.duration}s</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  banner: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  timerItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  timerText: {
    fontSize: 16,
  },
});

export default HomeScreen;