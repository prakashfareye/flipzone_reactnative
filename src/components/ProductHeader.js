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


const ProductHeader = (props) => {

    return (
        <View style={styles.searchBar}>
            <TouchableOpacity style={{alignSelf: "center"}}>
                <View>
                    <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                </View>
            </TouchableOpacity>
            <View style={{width: 150, flexdirection: "row", alignSelf: "center", height: 30}}>
                    <Text numberOfLines={1} style={{color: "black", fontWeight: 'bold'}}>hi amaaaaaaaaa tu</Text>

            </View>
            <TouchableOpacity style={{alignSelf: "center"}}>
                <View>
                    <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: "center"}}>
                <View>
                    <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchIcon: {
        width: 100,
        height: 100,
      },
    
      searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: ProjectColors.white
    }
})

export default ProductHeader;