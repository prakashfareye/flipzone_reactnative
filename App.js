/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Retailers from "./src/components/Retailers";
import Listing from "./src/components/Listing";
import Categories from "./src/components/Categories";
import ProductInfo from "./src/components/ProductInfo";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const App=() => {
  
  // useEffect(()=>{
    
  // })
  return (
    
      <NavigationContainer>
      <Stack.Navigator
         initialRouteName="Retailers"
        screenOptions={{
          headerShown: true,
          contentStyle:{
            backgroundColor:'#DADADA',
          },
          headerRight:()=>(<View><TouchableOpacity
            onPress={() => {
              alert("Successfully logged out");
            }}>
            <Text
              style={{color: 'blue',textDecorationLine:'underline'}}>
              Logout
            </Text>
          </TouchableOpacity></View>)
        }}>
        <Stack.Screen name="Retailers" component={Retailers}  options={{ title: 'Flipkart Seller',headerTitleAlign:'center'}}/>
       <Stack.Screen name="Listing" component={Listing} />
        <Stack.Screen name="Categories" component={Categories} />
       <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ title: 'Add New Product' }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  
  );
};

const styles = StyleSheet.create({
  
});

export default App;
