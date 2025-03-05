import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';

type StackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

export type AuthStackScreenProps<T extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
