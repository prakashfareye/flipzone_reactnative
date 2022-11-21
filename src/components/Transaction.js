import React, { useEffect, useState } from 'react';
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

import { ProjectColors } from './colors/ProjectColors';

import { IP } from './AndroidIP'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RotateInDownLeft } from 'react-native-reanimated';

const Transaction = ({ route, navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('user')
        .then(userResult => {
          userResult = JSON.parse(userResult);
          console.log('Before Address ..........', userResult);
          if (userResult != undefined) {
            fetch(`http://${IP}:8085/address/u/` + userResult.userId, {
              method: 'GET',
            })
              .then(response => response.json())
              .then(data => {

                setUserId(userResult.userId)
                setAddressList(data)
              })
              .catch(error => console.log('get address api fail ', error));
          }
        })
        .catch(error => console.log('User get async error!'));
    })

  }, []);

  const [cardNumber, setCardNumber] = useState();
  const [expirydate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const [pincode, setPincode] = useState();
  const [description, setDescription] = useState();
  const [userId, setUserId] = useState();
  const [addresssSelected, setAddresssSelected] = useState();
  const [EditAddress, setEditAddress] = useState();
  const [addingAddress, setAddingAddress] = useState()
  const [addressList, setAddressList] = useState([
  ])

  function goToHome() {
    navigation.navigate('Home');
  }

  const handleSubmit = () => {

    if (addresssSelected == undefined) {
      alert("Please select address");

    } else {
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
                        product: {
                          productId: productTransactionResult.productId
                        },
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

                    addressId: addressList[addresssSelected].address_id
                  };
                  console.log(payload);
                  fetch(`http://${IP}:8085/order`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                  })
                    .then(response => response.json())
                    .then(res => {
                      console.log(res)
                      alert("transaction successful");
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
                              product: {
                                productId: element.productId
                              },
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
                          addressId: addressList[addresssSelected].address_id
                        };
                        fetch(`http://${IP}:8085/order`, {
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

                            fetch(`http://${IP}:8085/cartItem/u/` + userId, {
                              method: 'DELETE',
                            })
                              .then(response => {
                                console.log(response);
                                updatedTotalItems = 0
                                AsyncStorage.setItem('cartCount', updatedTotalItems.toString())
                                  .catch(error =>
                                    console.log('cart set cartCount AsyncStorage error', error),
                                  );
                                alert("transaction successful");
                                navigation.navigate("Home")
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
    }

  };

  const editPress = index => {
    if (EditAddress != undefined) { alert("Please save previous address"); }
    else {
      setEditAddress(index)
      console.log(addressList[index])
      setDescription(addressList[index].description)
      setPincode(addressList[index].pinCode)
    }

  }

  const selectAddress = index => {

    setAddresssSelected(index)

  }

  const removeAddress = index => {

    if (addingAddress == index) {
      updatedAddressList = addressList
        .slice(0, index)
        .concat(addressList.slice(index + 1));
      setAddressList(updatedAddressList)
      setAddingAddress()
      setEditAddress()
    } else {

      fetch(`http://${IP}:8085/address/` + addressList[index].address_id, {
        method: 'DELETE',
      }).then(response => {
        console.log(response);
        updatedAddressList = addressList
          .slice(0, index)
          .concat(addressList.slice(index + 1));
        setAddressList(updatedAddressList)
        if (EditAddress == index) {
          setEditAddress()
        } else if (EditAddress != undefined && index < EditAddress) {
          updatedEditAddress = EditAddress - 1
          setEditAddress(updatedEditAddress)
        }

        if (index == addresssSelected) {
          setAddresssSelected()
        } else if (addresssSelected != undefined && index < addresssSelected) {
          updatedAddresssSelected = addresssSelected - 1
          setAddresssSelected(updatedAddresssSelected)
        }
      });
    }

  }

  const savePress = index => {

    if (description == "" || pincode == "") {
      console.log("mil gaya")
      alert("Please provide valid entries for address");
    } else if (addingAddress == index) {
      fetch(`http://${IP}:8085/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pinCode: pincode,
          description: description,
          userId: userId,
        }),
      })
        .then(response => response.json())
        .then(addressRes => {
          updatedAddressList = [...addressList];
          updatedAddressList[index].description = description
          updatedAddressList[index].pinCode = pincode
          updatedAddressList[index].address_id = addressRes.address_id

          setAddressList(updatedAddressList)
          setEditAddress()
          setDescription()
          setPincode()
          setAddingAddress()
        })
        .catch(error => console.log('address create api fail', error));
    }
    else {
      fetch(`http://${IP}:8085/address/` + addressList[index].address_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pinCode: pincode,
          description: description,
          userId: userId,
        }),
      })
        .then(response => response.json())
        .then(res => {
          updatedAddressList = [...addressList];
          updatedAddressList[index].description = description
          updatedAddressList[index].pinCode = pincode
          setAddressList(updatedAddressList)
          setEditAddress()
          setDescription()
          setPincode()
          setEditAddress()
        })
        .catch(error => console.log('address update api fail', error));
    }

  }

  const unselectPress = index => {
    setAddresssSelected()
  }

  const handleCancel = () => {
    console.log('cancel');
    navigation.goBack();
  };

  const addAddress = () => {
    if (EditAddress != undefined) { alert("Please save previous address"); }
    else {
      updatedAddressList = [{
        "pinCode": "",
        "description": "",
        "userId": userId
      }, ...addressList];
      setEditAddress(0)
      setAddingAddress(0)
      setAddressList(updatedAddressList)
      setPincode('')
      setDescription('')
      if (addresssSelected != undefined) {
        updatedAddresssSelected = addresssSelected + 1
        setAddresssSelected(updatedAddresssSelected)
      }
    }
  }



  return (
    <SafeAreaView
      style={{
        backgroundColor: ProjectColors.white,
        flex: 1,
        flexDirection: "column"
      }}
      behavior="height">
      <View style={{ borderWidth: 0 }}>
        <Text style={{ padding: 20, fontWeight: 'bold' }}>Card Details</Text>
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
          secureTextEntry={true}
          onChangeText={text => {
            setCvv(text);
          }}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <TouchableOpacity
        onPress={addAddress}
        style={{
          backgroundColor: ProjectColors.navy, height: 60,
          width: 125,
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 30
        }}>
        <Text style={styles.buttonText}>Add Address</Text>
      </TouchableOpacity>

      <ScrollView style={{ margin: 10, height: 100 }}>
        {
          addressList.map((address, index) => {
            return (
              <View key={index} style={{ marginHorizontal: 20, marginTop: 2.5, marginBottom: 2.5, flexDirection: "column", padding: 10, justifyContent: "space-evenly", elevation: 3, backgroundColor: addresssSelected == index ? ProjectColors.mint : "white" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: 'bold', alignSelf: "center" }}>Description</Text>
                  <TextInput
                    label="address"
                    value={index == EditAddress ? description : address.description}
                    editable={EditAddress == index}
                    style={[styles.addressInput, { alignSelf: "center" }]}
                    placeholder="Address"
                    placeholderTextColor={ProjectColors.grey}
                    onChangeText={text => {
                      setDescription(text);
                    }}
                    multiline
                    numberOfLines={3}
                  />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', alignSelf: "center" }}>PIN Code</Text>
                  <TextInput
                    label="pincode"
                    value={index == EditAddress ? pincode : address.pinCode}
                    editable={EditAddress == index}
                    style={[styles.addressInput, { alignSelf: "center" }]}
                    placeholder="Pincode"
                    placeholderTextColor={ProjectColors.grey}
                    onChangeText={text => {
                      setPincode(text);
                    }}
                    maxLength={6}
                    keyboardType="numeric"
                  />
                </View>
                {EditAddress != index && <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 5, marginTop: 20 }}>
                  {addresssSelected != index && <TouchableOpacity
                    onPress={() => selectAddress(index)}
                    style={[styles.button, { backgroundColor: "green" }]}>
                    <Text style={styles.buttonText}>Select</Text>
                  </TouchableOpacity>}
                  {addresssSelected == index && <TouchableOpacity
                    onPress={() => unselectPress(index)}
                    style={[styles.button, { backgroundColor: "white" }]}>
                    <Text style={{
                      color: 'black',
                      alignSelf: 'center',
                    }}>UnSelect</Text>
                  </TouchableOpacity>}
                  <TouchableOpacity
                    onPress={() => editPress(index)}
                    style={[styles.button, { backgroundColor: ProjectColors.navy }]}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeAddress(index)}
                    style={[styles.button, { backgroundColor: "red" }]}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>}
                {EditAddress == index && <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 5, marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => savePress(index)}
                    style={[styles.button, { backgroundColor: "green" }]}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>}
              </View>
            )
          })
        }
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.bottomButton, { backgroundColor: ProjectColors.navy }]}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.bottomButton, { backgroundColor: "red" }]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 80,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  bottomButton: {
    height: 75,
    width: 200,
    justifyContent: 'center',
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
  addressInput: {

    width: 200,
    height: 40,
    borderWidth: 1,
    alignSelf: "center",
    borderColor: ProjectColors.grey,
    underlineColor: ProjectColors.black,
    borderRadius: 10,
    activeUnderlineColor: ProjectColors.black,
  },
});

export default Transaction;
