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
  FlatList,
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

import Footer from './Footer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {validatePathConfig} from '@react-navigation/native';
import Summary from './Summary';

const Account = ({navigation, route}) => {
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(res => {
        res = JSON.parse(res);
        setEmail(res.userEmailId);
        setName(res.userName);
        setRole(res.role);
        console.log('hello');
        console.log(res.userId + 'hi');
        fetch(`http://10.0.2.2:8085/order/u/${res.userId}`)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson.orderItems);
            setUserOrders(responseJson);
          })
          .catch(error => console.log('get all categories api fail ', error));
      })
      .catch(error => console.log('user AsyncStorage error in account', error));
  }, []);

  logOutPress = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('Registration Page');
  };
  const [email, setEmail] = useState('tushar@gmail.com');
  const [name, setName] = useState('tushar Bansal');
  const [role, setRole] = useState('ROLE_USER');
  const [userOrders, setUserOrders] = useState();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: ProjectColors.mint,
      }}>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            alignSelf: 'center',
            width: 350,
            height: 200,
            marginTop: 20,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 10,
                fontWeight: '800',
                fontSize: 20,
              }}>
              Name:
            </Text>
            <Text style={{alignSelf: 'center', paddingRight: 10, fontSize: 15}}>
              {name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 10,
                fontWeight: '800',
                fontSize: 20,
              }}>
              Email ID:
            </Text>
            <Text style={{alignSelf: 'center', paddingRight: 10, fontSize: 15}}>
              {email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 10,
                fontWeight: '800',
                fontSize: 20,
              }}>
              Role:
            </Text>
            <Text style={{alignSelf: 'center', paddingRight: 10, fontSize: 15}}>
              {role}
            </Text>
          </View>
        </View>
        <View style={styles.sectionView}>
          <Text style={{textAlign: 'left', fontWeight: 'bold',fontSize:20}}>
            Your Orders
          </Text>
          <FlatList
            // style={{marginTop: -150}}
            data={userOrders}
            renderItem={({item}) => (
              <View
                style={[
                  styles.sectionView,
                  {height: 100, backgroundColor: '#DADADA'},
                ]}>
                <Text>OrderItemId: <Text>{item.orderItems[0].orderItemId}</Text></Text>
                <Text>ProductId:  <Text>{item.orderItems[0].productId}</Text></Text>
                <Text>Amount: Rs <Text style={{fontWeight:'bold'}}>{item.orderItems[0].total}</Text></Text>  
                <Text>Status: <Text> {item.status}</Text></Text>
              
              </View>
            )}
            keyExtractor={item => item.orderId}
          />
        </View>
        <TouchableOpacity
          onPress={logOutPress}
          style={[styles.button, {backgroundColor: ProjectColors.teal}]}>
          <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
      <Footer
        productHeaderNavigation={navigation}
        currentScreen="Account"></Footer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 75,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  sectionView: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    height: 300,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default Account;
