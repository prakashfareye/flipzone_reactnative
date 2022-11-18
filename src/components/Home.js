import React, { useState, useEffect, componentDidMount } from 'react';
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

import { ProjectColors } from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from './Footer';

const Home = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('home');

    AsyncStorage.getItem('user')
      .then(result => {
        result = JSON.parse(result);
        AsyncStorage.getItem('cartCount').then(result => {
          if (result != undefined) {
            console.log(result);
            setcartCount(parseInt(result))
          } else {
            console.log("not in async storage")
            fetch('http://10.0.2.2:8085/cartItem/u/' + result.userId, {
              method: 'GET',
            })
              .then(response => response.json())
              .then(data => {
                let initialTotalItems = 0;
                data.forEach(element => {
                  if (element.cartItemQuantity <= element.product.productQuantity) {
                    initialTotalItems += element.cartItemQuantity;
                  } else {
                    console.log(data)
                    fetch('http://10.0.2.2:8085/cartItem/c/' + element.cartItemId, {
                      method: 'DELETE',
                    }).then(response => console.log(response))
                  }
                });

                setcartCount(initialTotalItems);
                AsyncStorage.setItem('cartCount', initialTotalItems.toString())
                  .catch(error =>
                    console.log('home cartCount AsyncStorage error', error),
                  );
              })
              .catch(error => console.log('get all categories api fail ', error));
          }
        })
          .catch(error => console.log('Hone get cartCount AsyncStorage error'));


      })
      .catch(error => console.log('Product AsyncStorage  error'));

    fetch('http://10.0.2.2:8085/category', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setProductCategories(data);
      })
      .catch(error => console.log('get all categories api fail ', error));

    fetch('http://10.0.2.2:8085/product', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        imageList = [];
        data.forEach(element => {
          imageList.push(element.productImageURL);
        });
        console.log(imageList);
        setTopProductImages(imageList);
        setTopProducts(data);
      })
      .catch(error => console.log('get top products api fail ', error));
    })
    
  }, []);

  const [topProducts, setTopProducts] = useState([]);

  const [topProductImages, setTopProductImages] = useState([]);

  const [cartCount, setcartCount] = useState(0);

  const [productCategories, setProductCategories] = useState([
    {
      productCategoryId: 1,
      productCategoryName: 'shoes',
      productCategoryImageURL:
        'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
    },
    {
      productCategoryId: 2,
      productCategoryName: 'shoes111',
      productCategoryImageURL:
        'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
    },
  ]);

  const searchBarPress = () => {
    AsyncStorage.setItem('searchText', '')
      .then(() => navigation.navigate('Search'))
      .catch(error => console.log('searchBarPress AsyncStorage error'));
  };

  const productCategoryPress = index => {
    AsyncStorage.removeItem('similarProducts');
    AsyncStorage.setItem(
      'ProductsByCategory',
      JSON.stringify({
        productCategoryId: productCategories[index].productCategoryId,
        productCategoryName: productCategories[index].productCategoryName,
      }),
    )
      .then(() => navigation.navigate('ProductList'))
      .catch(error => console.log('productCategoryPress AsyncStorage error'));
  };

  const topProductPress = index => {
    AsyncStorage.setItem('ProductFeatures', JSON.stringify(topProducts[index]))
      .then(() => navigation.navigate('Product'))
      .catch(error =>
        console.log('home productCardPress AsyncStorage error', error),
      );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ProjectColors.mint }}>
      <View style={styles.defaultStyle}>
        <TouchableOpacity onPress={searchBarPress} style={styles.searchBar}>
          <View style={{ position: 'absolute', bottom: 6, right: 315 }}>
            <Image
              styles={styles.searchIcon}
              source={require('../assets/icons8-search-30.png')}></Image>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 6,
              right: 65,
            }}>
            <Text style={{ color: 'grey', alignSelf: 'center' }}>
              Please enter product name
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flexDirection: 'column' }}>
        <ScrollView
          style={{ marginTop: 10 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}>
          {topProductImages.map((image, index) => {
            return (
              <TouchableOpacity
                onPress={() => topProductPress(index)}
                style={{}}
                key={index}
                delayPressIn={70}>
                <View
                  style={{
                    width: 300, backgroundColor: ProjectColors.navy, margin: 4, display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', padding: 5
                  }}>
                  <Image
                    style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                    source={{ uri: image }}></Image>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {productCategories.map((item, index) => {
          if (index % 2 == 0 && index + 1 != productCategories.length) {
            return (
              <View
                key={index}
                style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity
                  onPress={() => productCategoryPress(index)}
                  delayPressIn={70}
                  style={{
                    height: 250,
                    width: 185,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 4,
                    marginVertical: 6,
                    backgroundColor: ProjectColors.white,
                    elevation: 3,
                  }}>
                  <View style={{ width: 170, height: 170, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 170, height: 170 }}
                      source={{ uri: item.productCategoryImageURL }}></Image>
                  </View>

                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'black',
                      fontFamily: 'bold',
                    }}>
                    {item.productCategoryName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => productCategoryPress(index + 1)}
                  delayPressIn={70}
                  style={{
                    height: 250,
                    width: 185,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 4,
                    marginVertical: 6,
                    backgroundColor: ProjectColors.white,
                    elevation: 3,
                  }}>
                  <View style={{ width: 170, height: 170, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 170, height: 170 }}
                      source={{
                        uri: productCategories[index + 1]
                          .productCategoryImageURL,
                      }}></Image>
                  </View>

                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'black',
                      fontFamily: 'bold',
                    }}>
                    {productCategories[index + 1].productCategoryName}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          } else if (index % 2 == 0 && index + 1 == productCategories.length) {
            return (
              <View key={index} style={{ flexDirection: 'row', marginLeft: 5 }}>
                <TouchableOpacity
                  onPress={() => productCategoryPress(index)}
                  delayPressIn={70}
                  style={{
                    height: 250,
                    width: 185,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 4,
                    marginVertical: 6,
                    backgroundColor: ProjectColors.white,
                    elevation: 3,
                  }}>
                  <View style={{ width: 170, height: 170, alignSelf: 'center' }}>
                    <Image
                      style={{ width: 170, height: 170 }}
                      source={{ uri: item.productCategoryImageURL }}></Image>
                  </View>

                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'black',
                      fontFamily: 'bold',
                    }}>
                    {item.productCategoryName}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </ScrollView>
      <Footer
        cartCount={cartCount}
        productHeaderNavigation={navigation}
        currentScreen="Home"></Footer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 50,
    backgroundColor: ProjectColors.navy,
  },

  searchBar: {
    width: 350,
    height: 40,
    backgroundColor: ProjectColors.white,
    alignSelf: 'center',
  },

  searchIcon: {
    width: 100,
    height: 100,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    paddingTop: 5,
  },

  list: {
    justifyContent: 'space-around',
  },
});

export default Home;
