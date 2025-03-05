import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let interval: any

const TimerManagementScreen = (props) => {
  const [timer, setTimer] = useState(props.route.params.timer);
  const [originalDuration, setOriginalDuration] = useState(props.route.params.timer?.duration)
  const [runningTimers, setRunningTimers] = useState(false);

  const startTimer = async () => {
    const storedTimers = JSON.parse(await AsyncStorage.getItem('timers') || "");
    clearInterval(interval)
    interval = setInterval(() => {
        setTimer(prev => {
            console.log(prev)
            if (prev.duration === 0) {
                clearInterval(interval)
                setRunningTimers(false)
                saveInStorage(storedTimers, "status", "completed")
                return {...prev, status: "completed"}
            }
            saveInStorage(storedTimers, "duration", prev.duration - 1)
            return {
                ...prev, 
                duration: prev.duration - 1
            }
        })
    }, 1000)
    setRunningTimers(true)
  };

  const saveInStorage = (timers, key, val) => {
    const newTimer = [...timers]
    const findIndex = newTimer.findIndex(val => val.id === timer.id)
    console.log(timer, newTimer)
    newTimer[findIndex][key] = val
    AsyncStorage.setItem('timers', JSON.stringify(newTimer));
  }

  const pauseTimer = async () => {

    if (runningTimers) {
      clearInterval(interval)
      setRunningTimers(false)
      setTimer(prev => ({...prev, status: "paused"}))
    } else {
        startTimer()
        setRunningTimers(true)
    }
  };

  const resetTimer = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    pauseTimer();
    setTimer({...timer, duration: originalDuration})
    saveInStorage(storedTimers, "duration", originalDuration)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer Management</Text>
          <View style={styles.timerItem}>
            <Text style={styles.timerText}>{timer.name} - {timer.duration}s</Text>
            <Text>Status: {timer.status}</Text>
            <View style={styles.buttonRow}>
              <Button title="Start" onPress={() => startTimer()} disabled={runningTimers} />
              <Button title="Pause" onPress={() => pauseTimer()} disabled={!runningTimers} />
              <Button title="Reset" onPress={() => resetTimer()} />
            </View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TimerManagementScreen;
