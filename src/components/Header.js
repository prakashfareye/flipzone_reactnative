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


const Header = (props) => {

    return (
        
    <SafeAreaView style={props.style==undefined ? styles.defaultStyle : props.style}>
        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
            <TouchableOpacity style={{alignSelf: "center"}}>
                <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
            </TouchableOpacity>
            <Text style={{color: ProjectColors.white}}>Logout</Text>
        </View>
        <View style={styles.searchBar}>
            <TextInput style={{width: 310}}></TextInput>
            <TouchableOpacity style={{alignSelf: "center"}}>
                <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 100,
        backgroundColor: ProjectColors.navy
    },

    searchBar: {
        flexDirection: "row",
        width: 350,
        height: 40,
        backgroundColor: ProjectColors.white,
        alignSelf: "center"
    },

    searchIcon: {
        width: 25,
        height: 20,
      },
})

export default Header;