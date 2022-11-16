import React, {useState, useEffect, useRef} from 'react';
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
  FlatList, Button
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Footer from './Footer';

const Summary = ({ navigation, route }) => {

    useEffect(() => {
        console.log("summary")
            AsyncStorage.getItem('ProductFeatures')
            .then((result) => {
                result = JSON.parse(result)
                result.productItemCount=1
                initialTotalPrice = result.productPrice*result.productItemCount
                initialTotalItems = result.productItemCount
        
        
                setTotalPrice(initialTotalPrice)
                setTotalItems(initialTotalItems)
                setProductItem([result])
            })
            .catch(error => console.log("Product AsyncStorage  error"));
        

        
    }, [])

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(1)
    const [productItem, setProductItem] = useState(
        [
            {
                "productId": 1,
                "productName": "shoes",
                "brand": "brand",
                "productQuantity": 5,
                "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
                "productPrice": 30000,
                "productDescription": "key feature 1,key feature 2222222,key feature 353434353",
                "productItemCount": 1
            },
        ]
    )

    minusClick = () => {
        
        if(productItem[0].productItemCount == 1) {
            setProductItem([])
            setTotalItems(0)
            setTotalPrice(0)
        } else {
            updateProductItem = [...productItem]
            updateProductItem[0].productItemCount -= 1
            updatedtotalPrice = updateProductItem[0].productItemCount*updateProductItem[0].productPrice
            updatedtotalItems = totalItems -1
            setProductItem(updateProductItem)
            setTotalItems(updatedtotalItems)
            setTotalPrice(updatedtotalPrice)
        }

    }

    plusClick = () => {
        if(productItem[0].productItemCount != productItem[0].productQuantity) {
        updateProductItem = [...productItem]
        updateProductItem[0].productItemCount += 1
        updatedtotalPrice = updateProductItem[0].productItemCount*updateProductItem[0].productPrice
        updatedtotalItems = totalItems + 1
        setProductItem(updateProductItem)
        setTotalItems(updatedtotalItems)
        setTotalPrice(updatedtotalPrice) }
    }

    const productCardPress = (index) => {
        navigation.navigate("Product")
    }

    removeCartItem = () => {
        setProductItem([])
        setTotalPrice(0)
        setTotalItems(0)

    }

    const handlePlaceOrder =() => {
        AsyncStorage.removeItem("cartTransaction")
        AsyncStorage.setItem('productTransaction', JSON.stringify(productItem[0]))
        .then(() => navigation.navigate("Transaction"))
        .catch(error => console.log("summary handlePlaceOrder  AsyncStorage error", error));
    }

    const routeBack = () => {
        navigation.goBack()

    }

    const keyExtractor = (item) => item.productId;

    const renderItem = ({ item, index}) => (
        <View>
        <TouchableOpacity onPress={productCardPress} delayPressIn={75} style={{height: 300, width: 375, backgroundColor: ProjectColors.white, marginBottom: 10}}>
            <View style={{width: 150, height: 150, position: "absolute", top: 5, left: 5, borderWidth: 0.5}}>
                <Image style={{width: 150, height: 150}} source={{uri: item.productImageURL}}></Image>
            </View>
            <View style={{width: 200, position: "absolute", top: 5, right: 10, flexDirection: "column"}}>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 20, fontWeight: "500"}}>{item.productName}</Text>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 15, paddingTop: 10}}>Brand: <Text style={{textTransform: 'lowercase'}}>{item.brand}</Text></Text>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800", paddingTop: 10}}>$ <Text>{item.productPrice}</Text></Text>
            </View>
            <View style={{position: "absolute", bottom: 20, left: 20, flexDirection: "row", borderWidth: 1}}>
                <TouchableOpacity onPress={() => minusClick()} style={{height: 40, width: 40, borderWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Text style={{alignSelf: "center"}}>-</Text>
                </TouchableOpacity>
                <Text style={{height: 40, width: 40, fontWeight: "800", color: ProjectColors.black, textAlignVertical: 'center', textAlign: "center", borderWidth: 1}}>{item.productItemCount}</Text>
                <TouchableOpacity disables={productItem[0].productItemCount != productItem[0].productQuantity}onPress={plusClick} style={{height: 40, width: 40, borderWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Text style={{alignSelf: "center"}}>+</Text>
                </TouchableOpacity>
            </View>
            <Text onPress={() => removeCartItem()} style={{position: "absolute", bottom: 30, left: 165, color: ProjectColors.navy, fontWeight: "500", fontSize: 15}}>Remove</Text>
        </TouchableOpacity>
        {
            (index==productItem.length-1) && 
            <View style={{height: 200, backgroundColor: "white"}}>
                <Text style={{color: "black", fontSize: 15, fontWeight: "700", marginBottom: 5}}>Price Details</Text>
                <Text style={{color: "black", fontSize: 15, position: "absolute", top: 50, left: 10}}>price ({totalItems} items)</Text>
                <Text style={{color: "black", fontSize: 15, position: "absolute", top: 50, right: 10}}>$ {totalPrice}</Text>

                <Text style={{color: "black", fontSize: 15, position: "absolute", top: 90, left: 10}}>delievery charges</Text>
                <Text style={{color: ProjectColors.navy, fontSize: 15, position: "absolute", top: 90, right: 10}}>FREE DELIEVERY</Text>
                <Text style={{color: "black", fontWeight: "700", fontSize: 15, position: "absolute", top: 150, left: 10}}>Total Price</Text>
                <Text style={{color: ProjectColors.black, fontWeight: "700", fontSize: 15, position: "absolute", top: 150, right: 10}}>$ {totalPrice}</Text>
            </View>

        }
        </View>
    
        
    
    )




    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.mint, flex: 1}}>
            <View style={styles.searchBar}>
                <TouchableOpacity onPress={routeBack} style={{alignSelf: "center", paddingLeft: 10}}>
                    <View>
                        <Image styles={styles.searchIcon} source={require('../assets/icons8-left-24.png')}></Image>
                    </View>
                </TouchableOpacity>
                <Text style={{alignSelf: "center", color: ProjectColors.black, fontWeight: "500", paddingLeft: 30}}>Summary</Text>
            </View>
            <FlatList
                    data={productItem}
                    renderItem={renderItem}
                    keyExtractor={item => item.productId}
                    style={styles.container}
            />
            <View style={{flexDirection: "row", justifyContent: "space-evenly", height: 75, elevation: 3, backgroundColor: ProjectColors.white, borderTopWidth: 0.5, borderBottomWidth: 0.25}}>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800"}}>$ {totalPrice}</Text>

                <TouchableOpacity style={[styles.button, {backgroundColor: ProjectColors.navy}]} onPress={handlePlaceOrder}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
            <Footer productHeaderNavigation={navigation} currentScreen="Summary"></Footer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        marginTop: 10,    },

    searchIcon: {
        width: 100,
        height: 100,
      },
    
    searchBar: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: ProjectColors.white,
        borderBottomWidth: 0.5
    },
    button: {
        height: 50,
        width: 150,
        alignSelf: "center",
        justifyContent: "center"
      },
    
      buttonText: {
        color: "white",
        alignSelf: "center"
      },
})

export default Summary;