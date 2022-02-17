import React from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/Home';
import SingleRestaurentPage from './src/SingleRestaurentPage';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Cart" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HOME"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HOME" component={App} />
        <Stack.Screen name="SINGLE_PAGE" component={SingleRestaurentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
