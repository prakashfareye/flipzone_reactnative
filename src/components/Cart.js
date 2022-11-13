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

const Cart = () => {

    const [totalPrice, setTotalPrice] = useState(10000)
    const [totalItems, setTotalItems] = useState(8)
    const [cartItems, setcartItems] = useState(
        [
            {
                "id": 1,
                "name": "shoes",
                "retailer": "retailer",
                "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
                "price": 10000,
                "count": 2
            },
            {
                "id": 2,
                "name": "shoes",
                "retailer": "retailer",
                "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
                "price": 10000,
                "count": 2
            },
            {
                "id": 3,
                "name": "shoes",
                "retailer": "retailer",
                "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
                "price": 10000,
                "count": 2
            },
            {
                "id": 4,
                "name": "shoes",
                "retailer": "retailer",
                "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
                "price": 10000,
                "count": 2
            }
        ]
    )

    minusClick = (index) => {
        cartItems[index].count -= 1
        updatedCartItems = [...cartItems]
        console.log(updatedCartItems)
        updatedTotalPrice = totalPrice - cartItems[index].price
        updatedTotalItems = totalItems - 1
        setcartItems(updatedCartItems)
        setTotalPrice(updatedTotalPrice)
        setTotalItems(updatedTotalItems)
    }

    plusClick = (index) => {
        cartItems[index].count += 1
        updatedCartItems = [...cartItems]
        updatedTotalPrice = totalPrice + cartItems[index].price
        updatedTotalItems = totalItems + 1
        setcartItems(updatedCartItems)
        setTotalPrice(updatedTotalPrice)
        setTotalItems(updatedTotalItems)
    }

    removeCartItem = (index) => {
        console.log(index)
        updatedTotalPrice = totalPrice - cartItems[index].price*cartItems[index].count
        updatedTotalItems = totalItems - cartItems[index].count
        updatedCartItems = cartItems.slice(0, index).concat(cartItems.slice(index+1))
        console.log(updatedCartItems)
        setcartItems(updatedCartItems)
        setTotalPrice(updatedTotalPrice)
        setTotalItems(updatedTotalItems)

    }

    const routeBack = () => {

    }

    const keyExtractor = (item) => item.id;

    const renderItem = ({ item, index }) => (
        <View>
        <TouchableOpacity delayPressIn={75} style={{height: 300, width: 375, backgroundColor: ProjectColors.white, marginBottom: 10}}>
            <View style={{width: 150, height: 150, position: "absolute", top: 5, left: 5, borderWidth: 0.5}}>
                <Image style={{width: 150, height: 150}} source={{uri: item.imageUrl}}></Image>
            </View>
            <View style={{width: 200, position: "absolute", top: 5, right: 10, flexDirection: "column"}}>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 20, fontWeight: "500"}}>{item.name}</Text>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 15, paddingTop: 10}}>seller: <Text style={{textTransform: 'lowercase'}}>{item.retailer}</Text></Text>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800", paddingTop: 10}}>$ <Text>{item.price}</Text></Text>
            </View>
            <View style={{position: "absolute", bottom: 20, left: 20, flexDirection: "row", borderWidth: 1}}>
                <TouchableOpacity onPress={() => minusClick(index)} style={{height: 40, width: 40, borderWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Text style={{alignSelf: "center"}}>-</Text>
                </TouchableOpacity>
                <Text style={{height: 40, width: 40, fontWeight: "800", color: ProjectColors.black, textAlignVertical: 'center', textAlign: "center", borderWidth: 1}}>{item.count}</Text>
                <TouchableOpacity onPress={() => plusClick(index)} style={{height: 40, width: 40, borderWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Text style={{alignSelf: "center"}}>+</Text>
                </TouchableOpacity>
            </View>
            <Text onPress={() => removeCartItem(index)} style={{position: "absolute", bottom: 30, left: 165, color: ProjectColors.navy, fontWeight: "500", fontSize: 15}}>Remove</Text>
        </TouchableOpacity>
        {
            (index==cartItems.length-1) && 
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
                        <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                    </View>
                </TouchableOpacity>
                <Text style={{alignSelf: "center", color: ProjectColors.black, fontWeight: "500", paddingLeft: 30}}>My Cart</Text>
            </View>
            <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.container}
            />
            <View style={{flexDirection: "row", justifyContent: "space-evenly", height: 75, elevation: 3, backgroundColor: ProjectColors.white, borderTopWidth: 0.5}}>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800"}}>$ {totalPrice}</Text>

                <TouchableOpacity style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
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

export default Cart;