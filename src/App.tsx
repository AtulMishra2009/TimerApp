import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AppNavigator />
      </GestureHandlerRootView>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
