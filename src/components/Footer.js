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

const Footer = (props) => {

    const homePress = () => {
        if(props.currentScreen != "Home") {
            props.productHeaderNavigation.navigate("Home")
        }
    }

    const cartPress = () => {
        if(props.currentScreen != "Cart") {
            props.productHeaderNavigation.navigate("Cart")
        }
    }

    const accountPress = () => {
        if(props.currentScreen != "Account") {
            props.productHeaderNavigation.navigate("Account")
        }
    }

    return (
        <View style={styles.defaultStyle}>
            <TouchableOpacity onPress={homePress} tyle={styles.searchBar}>
                <View style={{position: "absolute", left: 22, top: 0}}>
                <Image styles={styles.searchIcon} source={require('../assets/icons8-home-page-32.png')}></Image>
                </View>
                <Text style={{color: props.currentScreen=="Home"? ProjectColors.navy : "black", alignSelf: "center", marginTop: 20, fontWeight: "500" }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={accountPress} style={styles.searchBar}>
                <View style={{position: "absolute", left: 22, top: 0}}>
                <Image styles={styles.searchIcon} source={require('../assets/icons8-account-30.png')}></Image>
                </View>
                <Text style={{color: props.currentScreen=="Account"? ProjectColors.navy : "black", alignSelf: "center", marginTop: 20, fontWeight: "500"}}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cartPress} style={styles.searchBar}>
                <View style={{position: "absolute", left: 25, top: 0}}>
                <Image styles={styles.searchIcon} source={require('../assets/icons8-shopping-cart-30.png')}></Image>
                </View>
                <Text style={{color: props.currentScreen=="Cart"? ProjectColors.navy : "black", alignSelf: "center", marginTop: 20, fontWeight: "500"}}>Cart</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: ProjectColors.white,
    },

    searchBar: {
        width: 75,
        height: 50,
        flexDirection: "column",
        alignSelf: "center",  
        justifyContent: "space-evenly"    
    },

    searchIcon: {
        width: 75,
        height: 25,
      },

})

export default Footer;