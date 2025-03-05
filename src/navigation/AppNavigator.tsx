import React from 'react';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import AddTimerScreen from '../screens/addTimer/AddTimer';
import TimerListGrouped from '../screens/TimerList/TimerList';
import TimerManagementScreen from '../screens/Timemanagement/Timermanagement';
// import AddTimerScreen from '../screens/home/Home';

export type StackParamList = {
  Home: undefined;
};

export type AppStackParamList<T extends keyof (StackParamList)> =
  StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='TimerListGrouped' component={TimerListGrouped} />
      <Stack.Screen name='TimerManagementScreen' component={TimerManagementScreen} />
       <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AddTimerScreen' component={AddTimerScreen} />
    </Stack.Navigator>
  );
}
