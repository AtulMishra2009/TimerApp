import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const TimerListGrouped = ({navigation}) => {
  const [groupedTimers, setGroupedTimers] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useFocusEffect(
    useCallback(() => {
      const fetchTimers = async () => {
        try {
          const storedTimers = await AsyncStorage.getItem('timers');
          if (storedTimers) {
            const timers = JSON.parse(storedTimers);
            const grouped = timers.reduce((acc, timer) => {
              if (!acc[timer.category]) {
                acc[timer.category] = [];
              }
              acc[timer.category].push(timer);
              return acc;
            }, {});
            setGroupedTimers(grouped);
          }
        } catch (error) {
          console.error('Error loading timers:', error);
        }
      };

      fetchTimers();
    }, []),
  );

  const toggleCategory = category => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <View style={styles.container}>
      {Object.keys(groupedTimers).map(category => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => toggleCategory(category)}
            style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category}</Text>
          </TouchableOpacity>
          {expandedCategories[category] && (
            <FlatList
              data={groupedTimers[category]}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.timerItem}
                  onPress={() =>
                    navigation.navigate('TimerManagementScreen', {timer: item})
                  }>
                  <Text style={styles.timerText}>
                    {item.name} - {item.duration}s
                  </Text>
                  <Text style={styles.status}>Status: {item.status}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ))}
      <Button
        title="Add Timer"
        onPress={() => navigation.navigate('AddTimerScreen')}
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
  categoryContainer: {
    marginBottom: 15,
  },
  categoryHeader: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  timerText: {
    fontSize: 16,
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TimerListGrouped;
