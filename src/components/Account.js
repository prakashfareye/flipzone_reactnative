import React, { useState, useEffect } from 'react';
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

import { ProjectColors } from './colors/ProjectColors';

import { IP } from './AndroidIP'

import Footer from './Footer';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Account = ({ navigation, route }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('cartCount').then(result => {
        if (result != undefined) {
          console.log(result);
          setcartCount(parseInt(result))
        }
      })
        .catch(error => console.log('Account cartCount AsyncStorage error'));
      AsyncStorage.getItem('user')
        .then((res) => {
          res = JSON.parse(res)
          setEmail(res.userEmailId)
          setName(res.userName)
          setRole(res.role)
          fetch(`http://${IP}:8085/order/u/` + res.userId, {
            method: 'GET',
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              let initialOrderItems = []
              data.forEach(order => {
                if (order.orderItems.length != 0) {
                  order.orderItems.forEach(orderItem => {
                    cloneOrderItem = JSON.parse(JSON.stringify(orderItem))
                    cloneOrderItem.orderDate = order.orderDate
                    initialOrderItems.push(cloneOrderItem)
                  });
                }
              });
              console.log(initialOrderItems)
              setOrderItems(initialOrderItems)
            })
            .catch(error => console.log('get all orders api fail ', error));
        })
        .catch(error => console.log("user AsyncStorage error in account", error));
    })


  }, [])

  logOutPress = () => {
    AsyncStorage.removeItem("user")
    navigation.navigate("Registration Page")
  }
  const [email, setEmail] = useState("tushar@gmail.com")
  const [name, setName] = useState("tushar Bansal")
  const [role, setRole] = useState("ROLE_USER")
  const [cartCount, setcartCount] = useState(0)
  const [orderItems, setOrderItems] = useState([
  ])

  cardPress = (index) => {
    AsyncStorage.setItem('ProductFeatures', JSON.stringify(orderItems[index].product))
      .then(() => navigation.navigate('Product'))
      .catch(error =>
        console.log('orderCardPress AsyncStorage error', error),
      );
  }



  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column", backgroundColor: ProjectColors.mint }}>
      <View>

        <View style={{ backgroundColor: "white", elevation: 3, alignSelf: "center", width: 350, height: 250, marginTop: 20, flexDirection: "column", justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20 }}>Name:</Text>
            <Text style={{ alignSelf: "center", paddingRight: 10, fontSize: 15 }}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20 }}>Email ID:</Text>
            <Text style={{ alignSelf: "center", paddingRight: 10, fontSize: 15 }}>{email}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ alignSelf: "center", paddingLeft: 10, fontWeight: "800", fontSize: 20 }}>Role:</Text>
            <Text style={{ alignSelf: "center", paddingRight: 10, fontSize: 15 }}>{role}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {
          orderItems.map((item, index) => {
            return (
              <View key={index}  >
                {item.product != null && <TouchableOpacity
                  onPress={() => cardPress(index)}
                  delayPressIn={75}
                  style={{
                    height: 225,
                    width: 375,
                    backgroundColor: ProjectColors.white,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      width: 150,
                      height: 200,
                      position: 'absolute',
                      top: 10,
                      left: 5,

                      borderWidth: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 120,
                        height: 180,
                      }}
                      source={{ uri: item.product.productImageURL }}></Image>
                  </View>
                  <View
                    style={{
                      width: 200,
                      position: 'absolute',
                      top: 5,
                      right: 10,
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        textTransform: 'uppercase',
                        fontSize: 20,
                        fontWeight: '500',
                      }}>
                      {item.product.productName}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        textTransform: 'uppercase',
                        fontSize: 15,
                        paddingTop: 10,
                      }}>
                      At:  <Text style={{ textTransform: 'lowercase' }}>{item.orderDate}</Text>
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        textTransform: 'uppercase',
                        fontSize: 15,
                        paddingTop: 10,
                      }}>
                      Qnty:  <Text style={{ textTransform: 'lowercase' }}>{item.quantity}</Text>
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        alignSelf: 'center',
                        paddingTop: 10,
                      }}>
                      Total: <Text style={{
                        fontWeight: '800', fontSize: 25,
                      }}>$ {item.total}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>}
              </View>
            )
          })
        }
      </ScrollView>
      <TouchableOpacity onPress={logOutPress} style={[styles.userButton, { backgroundColor: "red" }]}>
        <Text style={styles.userButtonText}>LOG OUT</Text>
      </TouchableOpacity>
      <Footer cartCount={cartCount} productHeaderNavigation={navigation} currentScreen="Account"></Footer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userButton: {
    height: 50,
    width: 400,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10
  },

  userButtonText: {
    color: "white",
    alignSelf: "center"
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 10
  },

  button: {
    marginVertical: 2.5,
    backgroundColor: ProjectColors.navy,
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },

  searchIcon: {
    width: '100%',
    height: '100%',
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    backgroundColor: ProjectColors.white,
  },
})

export default Account;