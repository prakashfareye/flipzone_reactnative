import React, { useState, useEffect, useRef } from 'react';
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
  DrawerLayoutAndroid,
  Image,
  FlatList,
  Button,
} from 'react-native';

import { ProjectColors } from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from './Footer';

const Cart = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('cart');
      AsyncStorage.getItem('user')
        .then(result => {
          result = JSON.parse(result);
          console.log(result.userId);
          fetch('http://10.0.2.2:8085/cartItem/u/' + result.userId, {
            method: 'GET',
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setcartItems(data);
              let initialTotalPrice = 0;
              let initialTotalItems = 0;
              data.forEach(element => {
                if (element.cartItemQuantity <= element.product.productQuantity) {
                  initialTotalPrice +=
                    element.cartItemQuantity * element.cartItemPrice;
                  initialTotalItems += element.cartItemQuantity;
                } else {
                  console.log(data)
                  fetch('http://10.0.2.2:8085/cartItem/c/' + element.cartItemId, {
                    method: 'DELETE',
                  }).then(response => console.log(response))
                }
              });

              setTotalPrice(initialTotalPrice);
              setTotalItems(initialTotalItems);
              AsyncStorage.setItem('cartCount', initialTotalItems.toString())
                .catch(error =>
                  console.log('cart set cartCount AsyncStorage error', error),
                );
            })
            .catch(error => console.log('get all categories api fail ', error));
        })
        .catch(error => console.log('Product AsyncStorage  error'));
    })

  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(8);
  const [cartItems, setcartItems] = useState([
    {
      cartItemId: 2,
      userId: 1,
      cartId: null,
      orderId: null,
      product: {
        productId: 1,
        categoryId: 1,
        productName: 'Iphone 14',
        brand: null,
        userId: 1,
        productPrice: 90000,
        productDescription: 'jjjjvjj',
        productQuantity: 5,
        productImageURL: 'aaaa',
      },
      productId: 1,
      cartItemQuantity: 2,
      cartItemPrice: 90000,
    },
  ]);

  let minusClick = index => {
    if (cartItems[index].cartItemQuantity == 1) {
      removeCartItem(index);
    } else {
      fetch(
        'http://10.0.2.2:8085/cartItem/decrease/' + cartItems[index].cartItemId,
        {
          method: 'PUT',
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          cartItems[index].cartItemQuantity -= 1;
          updatedCartItems = [...cartItems];
          console.log(updatedCartItems);
          updatedTotalPrice = totalPrice - cartItems[index].cartItemPrice;
          updatedTotalItems = totalItems - 1;
          setcartItems(updatedCartItems);
          setTotalPrice(updatedTotalPrice);
          setTotalItems(updatedTotalItems);
          AsyncStorage.setItem('cartCount', updatedTotalItems.toString())
            .catch(error =>
              console.log('Cart set cartCount AsyncStorage error', error),
            );
        })
        .catch(error => console.log('increase count api fail ', error));
    }
  };

  plusClick = index => {
    if (
      cartItems[index].cartItemQuantity !=
      cartItems[index].product.productQuantity
    ) {
      fetch(
        'http://10.0.2.2:8085/cartItem/increase/' + cartItems[index].cartItemId,
        {
          method: 'PUT',
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          cartItems[index].cartItemQuantity += 1;
          updatedCartItems = [...cartItems];
          updatedTotalPrice = totalPrice + cartItems[index].cartItemPrice;
          updatedTotalItems = totalItems + 1;
          setcartItems(updatedCartItems);
          setTotalPrice(updatedTotalPrice);
          setTotalItems(updatedTotalItems);
          AsyncStorage.setItem('cartCount', updatedTotalItems.toString())
            .catch(error =>
              console.log('Cart set cartCount AsyncStorage error', error),
            );
        })
        .catch(error => console.log('increase count api fail ', error));
    }
  };

  removeCartItem = index => {
    console.log('remove cart item');
    console.log(cartItems[index]);
    // api call
    fetch('http://10.0.2.2:8085/cartItem/c/' + cartItems[index].cartItemId, {
      method: 'DELETE',
    }).then(response => {
      console.log(response);
      updatedTotalPrice =
        totalPrice -
        cartItems[index].cartItemPrice * cartItems[index].cartItemQuantity;
      updatedTotalItems = totalItems - cartItems[index].cartItemQuantity;
      updatedCartItems = cartItems
        .slice(0, index)
        .concat(cartItems.slice(index + 1));
      console.log(updatedCartItems);
      setcartItems(updatedCartItems);
      setTotalPrice(updatedTotalPrice);
      setTotalItems(updatedTotalItems);
      AsyncStorage.setItem('cartCount', updatedTotalItems.toString())
        .catch(error =>
          console.log('Cart set cartCount AsyncStorage error', error),
        );
    });
  };

  const handlePlaceOrder = () => {
    if (totalPrice != 0) {
      AsyncStorage.removeItem('productTransaction');
      AsyncStorage.setItem('cartTransaction', JSON.stringify(cartItems))
        .then(() => navigation.navigate('Transaction'))
        .catch(error =>
          console.log('transaction handlePlaceOrder  AsyncStorage error', error),
        );
    }
  };

  const routeBack = () => {
    navigation.goBack();
  };

  const keyExtractor = item => item.cartItemId;

  const productCardPress = index => {
    console.log(cartItems[index]);
    AsyncStorage.setItem(
      'ProductFeatures',
      JSON.stringify(cartItems[index].product),
    )
      .then(() => navigation.navigate('Product'))
      .catch(error => console.log('productCardPress AsyncStorage error'));
  };

  const renderItem = ({ item, index }) => (
    <View>
      {item.cartItemQuantity <= item.product.productQuantity && (
        <TouchableOpacity
          onPress={() => productCardPress(index)}
          delayPressIn={75}
          style={{
            height: 300,
            width: 375,
            backgroundColor: ProjectColors.white,
            marginBottom: 10,
          }}>
          <View
            style={{
              width: 150,
              height: 150,
              position: 'absolute',
              top: 5,
              left: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 150, height: 150 }}
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
              Brand:{' '}
              <Text style={{ textTransform: 'lowercase' }}>
                {item.product.brand}
              </Text>
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                alignSelf: 'center',
                fontWeight: '800',
                paddingTop: 10,
              }}>
              $ <Text>{item.cartItemPrice}</Text>
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              flexDirection: 'row',
              borderWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => minusClick(index)}
              style={{
                height: 40,
                width: 40,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{ alignSelf: 'center' }}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                height: 40,
                width: 40,
                fontWeight: '800',
                color: ProjectColors.black,
                textAlignVertical: 'center',
                textAlign: 'center',
                borderWidth: 1,
              }}>
              {item.cartItemQuantity}
            </Text>
            <TouchableOpacity
              onPress={() => plusClick(index)}
              style={{
                height: 40,
                width: 40,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{ alignSelf: 'center' }}>+</Text>
            </TouchableOpacity>
          </View>
          <Text
            onPress={() => removeCartItem(index)}
            style={{
              position: 'absolute',
              bottom: 30,
              left: 165,
              color: ProjectColors.navy,
              fontWeight: '500',
              fontSize: 15,
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      )}
      {index == cartItems.length - 1 && (
        <View style={{ height: 200, backgroundColor: 'white', width: 375 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '700',
              marginBottom: 5,
            }}>
            Price Details
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              position: 'absolute',
              top: 50,
              left: 10,
            }}>
            price ({totalItems} items)
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              position: 'absolute',
              top: 50,
              right: 10,
            }}>
            $ {totalPrice}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: 15,
              position: 'absolute',
              top: 90,
              left: 10,
            }}>
            delievery charges
          </Text>
          <Text
            style={{
              color: ProjectColors.navy,
              fontSize: 15,
              position: 'absolute',
              top: 90,
              right: 10,
            }}>
            FREE DELIEVERY
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 15,
              position: 'absolute',
              top: 150,
              left: 10,
            }}>
            Total Price
          </Text>
          <Text
            style={{
              color: ProjectColors.black,
              fontWeight: '700',
              fontSize: 15,
              position: 'absolute',
              top: 150,
              right: 10,
            }}>
            $ {totalPrice}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: ProjectColors.mint, flex: 1 }}>
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={routeBack}
          style={{ alignSelf: 'center', paddingLeft: 10 }}>
          <View>
            <Image
              styles={styles.searchIcon}
              source={require('../assets/icons8-left-24.png')}></Image>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            color: ProjectColors.black,
            fontWeight: '500',
            paddingLeft: 30,
          }}>
          My Cart
        </Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.cartItemId}
        style={styles.container}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 75,
          elevation: 3,
          backgroundColor: ProjectColors.white,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.25,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            alignSelf: 'center',
            fontWeight: '800',
          }}>
          $ {totalPrice}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: ProjectColors.navy }]}
          onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
      <Footer
        cartCount={totalItems}
        productHeaderNavigation={navigation}
        currentScreen="Cart"></Footer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 10,
  },

  searchIcon: {
    width: 100,
    height: 100,
  },

  searchBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: ProjectColors.white,
    borderBottomWidth: 0.5,
  },
  button: {
    height: 50,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default Cart;
