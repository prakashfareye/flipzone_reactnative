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
  FlatList
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

const Account = ({ navigation, route }) => {
    return (
        <SafeAreaView></SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 75,
        width: 200,
        justifyContent: "center"
      },
    
      buttonText: {
        color: "white",
        alignSelf: "center"
      },
})

export default Account;