import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {DriversScreen} from '../screens/DriversScreen';
import {DriverDetailsScreen} from '../screens/DriverDetailsScreen';
import {DriverRacesScreen} from '../screens/DriverRacesScreen';
import {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Drivers" component={DriversScreen} />
      <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
      <Stack.Screen name="DriverRaces" component={DriverRacesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
