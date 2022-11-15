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

import ProductHeader from './ProductHeader'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = ({ navigation, route }) => {

    useEffect(() => {
        AsyncStorage.getItem('ProductFeatures')
        .then((result) => {
            if(result != undefined) {
                result = JSON.parse(result)
                setProduct(result)
            }
        })
        .catch(error => console.log("Product AsyncStorage  error"));
    }, [])

    const [product, setProduct] = useState(
        {
            "productId": 1,
            "productName": "shoes",
            "retailer": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 30000,
            "productDescription": "key feature 1,key feature 2222222,key feature 353434353"
        }
    )
    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.white, flex: 1}}>
            <ProductHeader productHeaderNavigation={navigation} title={product.productName}></ProductHeader>
            <ScrollView style={{
                flex: 1,
                flexDirection: "column",
            }}>
                <View style={{width: 375, height: 400, alignSelf: "center", backgroundColor: "white", marginTop: 10, borderWidth: 0.5, elevation: 3}}>
                    <Image style={{width: 375, height: 400, alignSelf: "center"}} source={{uri: product.productImageURL}}></Image>
                </View>
                <View style={{width: 375, flexDirection: "column", justifyContent: "center", backgroundColor: ProjectColors.mint, alignSelf: "center", elevation: 3}}>
                    <Text style={{color: "black", textTransform: 'uppercase', fontSize: 20, fontWeight: "500"}}>{product.productName}</Text>
                    <Text style={{color: "black", textTransform: 'uppercase', fontSize: 15, paddingTop: 10}}>seller: <Text style={{textTransform: 'lowercase'}}>{product.retailer}</Text></Text>
                    <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800", paddingTop: 10}}>$ <Text>{product.productPrice}</Text></Text>
                </View>
                <View style={{lexDirection: "column", marginTop: 10, marginHorizontal: 10, marginBottom: 5}}>
                    <Text style={{color: "black", fontSize: 20, fontWeight: "450"}}>Highlights</Text>
                    {product.productDescription.split(",").map((feature) => {
                            return (      
                                <View key={feature} style={{borderColor: "grey", marginVertical: 2}}>
                                    <Text style={{color: "black", fontSize: 10}}>{'\u2B24'}<Text style={{fontSize: 15}}>  {feature}</Text></Text>
                                </View>
                    )})

                    }
                </View>
            </ScrollView>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
                        <Text style={styles.buttonText}>Add to cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: ProjectColors.teal}]}>
                        <Text style={styles.buttonText}>Buy now</Text>
                    </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 75,
        width: 200,
        justifyContent: "center"
      },
    
      buttonText: {
        color: "white",
        alignSelf: "center"
      },
})

export default Product;
