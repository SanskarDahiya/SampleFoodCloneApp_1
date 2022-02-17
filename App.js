import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/Home';
import SingleRestaurentPage from './src/SingleRestaurentPage';
import {getCartReducer} from './src/ContextData';
import CartMenu from './src/CartMenu';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CartData = getCartReducer();
function CartScreen() {
  return (
    <CartData.Consumer>
      {cartData => {
        const items = Object.values(cartData.items || {});
        if (!items.length) {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 22}}>Empty Cart</Text>
            </View>
          );
        } else {
          return <CartMenu data={cartData} menu={items} />;
        }
      }}
    </CartData.Consumer>
  );
}

const App = () => {
  return (
    <CartData.Consumer>
      {cartData => {
        const CartOptions = {};
        if (cartData.itemCounts) {
          CartOptions.tabBarBadge = cartData.itemCounts;
        }
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
            <Tab.Screen name="Home" component={HomeScreen} options={{}} />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={CartOptions}
            />
          </Tab.Navigator>
        );
      }}
    </CartData.Consumer>
  );
};

const MainApp = () => {
  const [_cartData, setCartData] = useState({
    isEmpty: true,
    itemCounts: 0,
    items: {},
    price: 0,
  });
  return (
    <CartData.Provider
      value={{
        setCartData: update => {
          setCartData({..._cartData, ...update});
        },
        ..._cartData,
      }}>
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
    </CartData.Provider>
  );
};

export default MainApp;
