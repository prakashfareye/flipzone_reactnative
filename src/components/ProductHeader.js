import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductHeader = props => {
  useEffect(() => {}, []);

  backOnPress = () => {
    props.productHeaderNavigation.goBack();
  };

  CartPress = () => {
    props.productHeaderNavigation.navigate('Cart');
  };

  searchPress = () => {
    AsyncStorage.setItem('searchText', props.title)
      .then(() => props.productHeaderNavigation.navigate('Search'))
      .catch(error =>
        console.log('searchBarPress for header AsyncStorage error'),
      );
  };

  return (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={backOnPress} style={{alignSelf: 'center'}}>
        <View>
          <Image
            styles={styles.searchIcon}
            source={require('../assets/icons8-left-24.png')}></Image>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: 150,
          flexdirection: 'row',
          alignSelf: 'center',
          height: 30,
        }}>
        <Text numberOfLines={1} style={{color: 'black', fontWeight: 'bold'}}>
          {props.title ? props.title : ''}
        </Text>
      </View>
      <TouchableOpacity onPress={searchPress} style={{alignSelf: 'center'}}>
        <View>
          <Image
            styles={styles.searchIcon}
            source={require('../assets/icons8-search-30.png')}></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={CartPress} style={{alignSelf: 'center'}}>
        <View>
          <Image
            styles={styles.searchIcon}
            source={require('../assets/icons8-shopping-cart-30.png')}></Image>
        </View>
      </TouchableOpacity>
      <View style={{ width: 25, height: 25, borderRadius: 12.5, backgroundColor: "red", alignItems: "center", position: "absolute", right: 20, top: 1, flexDirection: "column", justifyContent: "space-evenly"}}>
            <Text style={{color: "white", alignSelf: "center"}}>{props.cartCount}</Text>

          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    width: 100,
    height: 100,
    borderBottomWidth: 0.5,
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    backgroundColor: ProjectColors.white,
  },
});

export default ProductHeader;
