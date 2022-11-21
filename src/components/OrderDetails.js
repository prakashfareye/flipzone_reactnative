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


const OrderDetails = ({ navigation, route }) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('orderDetails').then(result => {
                if (result != undefined) {
                    console.log("order details")
                    console.log(items);
                    setItems(JSON.parse(result))
                }
            })
                .catch(error => console.log('Order Details fetch AsyncStorage error', error));

        })

    }, [])


    const [items, setItems] = useState([])

    cardPress = (index) => {
        AsyncStorage.setItem('ProductFeatures', JSON.stringify(items[index].product))
            .then(() => navigation.navigate('Product'))
            .catch(error =>
                console.log('order detail card press AsyncStorage error', error),
            );
    }


    const routeBack = () => {
        navigation.goBack();
    };



    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", backgroundColor: ProjectColors.mint }}>
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
                    Order Details
                </Text>
            </View>
            <ScrollView style={styles.container}>
                { items != undefined &&
                    items.map((orderItem, index) => {
                        return (
                            <View key={index}  >
                                <TouchableOpacity
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
                                            source={{ uri: orderItem.product.productImageURL }}></Image>
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
                                            {orderItem.product.productName}
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'black',
                                                textTransform: 'uppercase',
                                                fontSize: 15,
                                                paddingTop: 10,
                                            }}>
                                            BRAND:  <Text style={{ textTransform: 'lowercase' }}>{orderItem.product.brand}</Text>
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'black',
                                                textTransform: 'uppercase',
                                                fontSize: 15,
                                                paddingTop: 10,
                                            }}>
                                            Qnty:  <Text style={{ textTransform: 'lowercase' }}>{orderItem.quantity}</Text>
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
                                            }}>$ {orderItem.total}</Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
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
        height: 50,
        backgroundColor: ProjectColors.white,
    },
})

export default OrderDetails;