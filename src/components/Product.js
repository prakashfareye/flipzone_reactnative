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

const product = () => {

    const [product, setProduct] = useState(
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "price": 10000,
            "description": "key feature 1,key feature 2,key feature 3,key feature 4,key feature 5"
        }
    )
    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.mint, flex: 1}}>
            <ProductHeader></ProductHeader>
            <ScrollView style={{
                flexDirection: "column",
            }}>
                <View style={{width: 375, height: 400, alignSelf: "center", backgroundColor: "white", marginTop: 10}}>
                    <Image style={{width: 375, height: 400, alignSelf: "center"}} source={{uri: "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"}}></Image>
                </View>
                <View style={{flexDirection: "column", marginHorizontal: 10, elevation: 2, backgroundColor:ProjectColors.teal }}>
                    <Text style={{color: "black", textTransform: 'uppercase', fontSize: 20}}>{product.name}</Text>
                    <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800"}}>$ <Text>{product.price}</Text></Text>
                </View>
                <View style={{lexDirection: "column", marginTop: 10, marginHorizontal: 10, backgroundColor: ProjectColors.mintDarker, marginBottom: 5}}>
                    <Text style={{color: "black", fontSize: 20, fontWeight: "450"}}>Highlights</Text>
                    {product.description.split(",").map((feature) => {
                            return (      
                                <View key={feature} style={{borderColor: "grey", marginVertical: 2}}>
                                    <Text style={{color: "black"}}>{'\u2B24'}<Text>  {feature}</Text></Text>
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

export default product;
