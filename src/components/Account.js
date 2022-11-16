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

import Footer from './Footer';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Account = ({ navigation, route }) => {

  useEffect(() => {
    AsyncStorage.getItem('user')
            .then((res) => {
              res = JSON.parse(res)
              setEmail(res.userEmailId)
              setName(res.userName)
              setRole(res.role)
            })
              .catch(error => console.log("user AsyncStorage error in account", error));

  }, [])

  logOutPress = () => {
    AsyncStorage.removeItem("user")
    navigation.navigate("Registration Page")
  }
  const [email, setEmail] = useState("tushar@gmail.com")
  const [name, setName] = useState("tushar Bansal")
  const [role, setRole] = useState("ROLE_USER")
    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: ProjectColors.mint}}>
        <ScrollView>

          <View style={{backgroundColor: "white", elevation: 3, alignSelf: "center", width: 350, height: 250, marginTop: 20, flexDirection: "column", justifyContent: "space-evenly"}}>
          <View style={{flexDirection: "row", justifyContent:"space-between" }}>
              <Text style={{alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20}}>Name:</Text>
              <Text style={{alignSelf: "center", paddingRight: 10, fontSize: 15}}>{name}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent:"space-between" }}>
              <Text style={{alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20}}>Email ID:</Text>
              <Text style={{alignSelf: "center", paddingRight: 10, fontSize: 15}}>{email}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent:"space-between" }}>
              <Text style={{alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20}}>Role:</Text>
              <Text style={{alignSelf: "center", paddingRight: 10, fontSize: 15}}>{role}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={logOutPress} style={[styles.button, {backgroundColor: ProjectColors.teal}]}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer productHeaderNavigation={navigation} currentScreen="Account"></Footer>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 75,
        width: 150,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 10
      },
    
      buttonText: {
        color: "white",
        alignSelf: "center"
      },
})

export default Account;