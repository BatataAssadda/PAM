import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import DevelopersScreen from '../screens/DevelopersScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer 
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#0FBA7C',
        },
        drawerActiveTintColor: '#00442D',
        drawerInactiveTintColor: '#1E6E8F',
        headerStyle: { backgroundColor: '#0FBA7C' },
        headerTintColor: '#000',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Tarefas" component={TasksScreen} />
      <Drawer.Screen name="Desenvolvedores" component={DevelopersScreen} />
    </Drawer.Navigator>
  );
}

// Stack principal
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}