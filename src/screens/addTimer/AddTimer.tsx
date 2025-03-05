import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const AddTimerScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');

  const saveTimer = async () => {
    if (!name || !duration) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      category,
      status: 'Paused',
    };

    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const timers = storedTimers ? JSON.parse(storedTimers) : [];
      timers.push(newTimer);
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
      Alert.alert('Success', 'Timer added successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save timer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter timer name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Duration (in seconds):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
      </Picker>

      <Button title="Save Timer" onPress= {saveTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default AddTimerScreen;