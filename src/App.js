/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import Search from './components/Search';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';
import Account from './components/Account';
import Summary from './components/Summary';
import Transaction from './components/Transaction';


const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
        <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}} />
        <Stack.Screen name="Product" component={Product} options={{headerShown: false}} />
        <Stack.Screen name="Cart" component={Cart} options={{headerShown: false}} />
        <Stack.Screen name="Account" component={Account} options={{headerShown: false}} />
        <Stack.Screen name="Summary" component={Summary} options={{headerShown: false}} />
        <Stack.Screen name="Transaction" component={Transaction} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
