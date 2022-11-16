import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  DrawerLayoutAndroid,
  Image,
  FlatList,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Transaction = ({route, navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userResult => {
        userResult = JSON.parse(userResult);
        console.log('Before Address ..........', userResult);
        if (userResult != undefined) {
          fetch('http://10.0.2.2:8085/address/u/' + userResult.userId, {
            method: 'GET',
          })
            .then(response => response.json())
            .then(data => {
              console.log(userId);
              setAddress(data.description);
              setPincode(data.pinCode);
              setAddressId(data.address_id);
              setUserId(userResult.userId);
            })
            .catch(error => console.log('get address api fail ', error));
        }
      })
      .catch(error => console.log('User get async error!'));
  }, []);

  const [cardNumber, setCardNumber] = useState();
  const [expirydate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const [pincode, setPincode] = useState();
  const [address, setAddress] = useState();
  const [address_id, setAddressId] = useState();
  const [userId, setUserId] = useState();

  const handleSubmit = () => {
    fetch('http://10.0.2.2:8085/address/' + address_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pinCode: pincode,
        description: address,
        userId: userId,
      }),
    })
      .then(response => response.json())
      .then(res => {
        // to write
      })
      .catch(error => console.log('address update api fail', error));

    console.log('transaction');
    AsyncStorage.getItem('user')
      .then(userResult => {
        userResult = JSON.parse(userResult);
        if (userResult != undefined) {
          AsyncStorage.getItem('productTransaction').then(
            productTransactionResult => {
              if (productTransactionResult != undefined) {
                console.log('product transaction');
                productTransactionResult = JSON.parse(productTransactionResult);
                console.log(productTransactionResult);
                payload = {
                  transactions: [
                    {
                      mode: 'GooglePay',
                      userId: userResult.userId,
                      status: 'Done',
                    },
                  ],
                  orderItems: [
                    {
                      productId: productTransactionResult.productId,
                      quantity: productTransactionResult.productItemCount,
                      total:
                        productTransactionResult.productItemCount *
                        productTransactionResult.productPrice,
                    },
                  ],
                  user: {
                    userId: userResult.userId,
                  },
                  status: 'Done',
                  total:
                    productTransactionResult.productItemCount *
                    productTransactionResult.productPrice,
                };
                fetch('http://10.0.2.2:8085/order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                })
                  .then(response => response.json())
                  .then(res => {
                    navigation.navigate('Home');
                  })
                  .catch(error =>
                    console.log('summary transaction api fail', error),
                  );
              } else {
                console.log('cart transaction');
                AsyncStorage.getItem('cartTransaction')
                  .then(cartTransactionResult => {
                    if (cartTransactionResult != undefined) {
                      console.log('cart transaction');
                      cartTransactionResult = JSON.parse(cartTransactionResult);
                      console.log(cartTransactionResult);

                      orderItems = [];
                      total = 0;

                      cartTransactionResult.forEach(element => {
                        if (
                          element.cartItemQuantity <=
                          element.product.productQuantity
                        ) {
                          total +=
                            element.cartItemQuantity * element.cartItemPrice;
                          orderItems.push({
                            productId: element.productId,
                            quantity: element.cartItemQuantity,
                            total:
                              element.cartItemQuantity * element.cartItemPrice,
                          });
                        }
                      });

                      payload = {
                        transactions: [
                          {
                            mode: 'GooglePay',
                            userId: userResult.userId,
                            status: 'Done',
                          },
                        ],
                        orderItems: orderItems,
                        user: {
                          userId: userResult.userId,
                        },
                        status: 'Done',
                        total: total,
                      };
                      fetch('http://10.0.2.2:8085/order', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                      })
                        .then(response => response.json())
                        .then(res => {
                          console.log('order placed');
                          console.log(res);

                          fetch('http://10.0.2.2:8085/cartItem/u/' + userId, {
                            method: 'DELETE',
                          })
                            .then(response => {
                              console.log(response);
                              navigation.navigate('Home');
                            })

                            .catch(error =>
                              console.log(
                                'get all categories api fail ',
                                error,
                              ),
                            );
                          // clear cart api hit
                        })
                        .catch(error =>
                          console.log('cart transaction api fail', error),
                        );
                    }
                  })

                  .catch(error =>
                    console.log('cart AsyncStorage  error', error),
                  );
              }
            },
          );
        }
      })

      .catch(error => console.log('user AsyncStorage  error', error));
    console.log('Submitting');
  };

  const handleCancel = () => {
    console.log('cancel');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: ProjectColors.white,
        flex: 1,
        justifyContent: 'center',
      }}
      behavior="height">
      <View style={styles.viewBox}>
        <Text style={{padding: 20, fontWeight: 'bold'}}>Address</Text>
        <TextInput
          label="address"
          value={address}
          style={styles.textInputEmail}
          placeholder="Address"
          placeholderTextColor={ProjectColors.grey}
          onChangeText={text => {
            setAddress(text);
          }}
          multiline
          numberOfLines={3}
        />
        <TextInput
          label="pincode"
          value={pincode}
          style={styles.textInputEmail}
          placeholder="Pincode"
          placeholderTextColor={ProjectColors.grey}
          onChangeText={text => {
            setPincode(text);
          }}
          maxLength={6}
          keyboardType="numeric"
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={{padding: 20, fontWeight: 'bold'}}>Card Details</Text>
          <TextInput
            label="cardNumber"
            style={styles.textInputEmail}
            placeholder="Card Number"
            placeholderTextColor={ProjectColors.grey}
            onChangeText={text => {
              setCardNumber(text);
            }}
            keyboardType="numeric"
            maxLength={12}
          />
          <TextInput
            label="expiry"
            style={styles.textInputEmail}
            placeholder="Expiry Date"
            placeholderTextColor={ProjectColors.grey}
            onChangeText={text => {
              setExpiryDate(text);
            }}
            keyboardType="numeric"
          />
          <TextInput
            label="cvv"
            style={styles.textInputEmail}
            placeholder="CVV"
            placeholderTextColor={ProjectColors.grey}
            onChangeText={text => {
              setCvv(text);
            }}
            keyboardType="numeric"
            maxLength={3}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: 15,
        }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 100,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputEmail: {
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginEnd: 20,
    borderWidth: 1,
    borderColor: ProjectColors.grey,
    underlineColor: ProjectColors.black,
    borderRadius: 10,
    activeUnderlineColor: ProjectColors.black,
  },
});

export default Transaction;
