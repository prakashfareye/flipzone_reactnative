/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Retailers from './src/components/Retailers';
import Listing from './src/components/Listing';
import ProductInfo from './src/components/ProductInfo';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Retailers"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2874F0',
          },
        }}>
        <Stack.Screen
          name="Retailers"
          component={Retailers}
          options={{
            title: 'Flipkart Seller',
            headerLargeTitle: true,
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    alert('Successfully logged out');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Listing"
          component={Listing}
          options={{
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    alert('Successfully logged out');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfo}
          options={{title: 'Add New Product'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
