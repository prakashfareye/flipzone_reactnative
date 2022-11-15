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
import { SearchBar } from 'react-native-elements';

import {ProjectColors} from './colors/ProjectColors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Search = ({ navigation, route }) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("yeah")
            AsyncStorage.getItem('searchText')
            .then((result) => {
                if(result != undefined) {
                    setSearchText(result)
                }
            })
            .catch(error => console.log("Search AsyncStorage  error"));
          });

      }, [])

    const [searchText, setSearchText] = useState("")

    const handleSearchText = (text) => {
        setSearchText(text)
        fetch('http://10.0.2.2:8085/product/search/' + text, {
            method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setFilterProducts(data)
            })
            .catch(error => console.log('get similarProducts api fail ', error));
        // setFilterProducts([        
        //     {
        //         "productId": 1,
        //         "productName": "shoes",
        //         "retailer": "retailer",
        //         "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
        //         "productPrice": 30000,
        //         "productDescription": "key feature 1,key feature 2222222,key feature 353434353"
        // }])
    }

    const [filterProducts, setFilterProducts] = useState([
        {
            "productId": 1,
            "productName": "shoes",
            "retailer": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 30000,
            "productDescription": "key feature 1,key feature 2222222,key feature 353434353"
        },
        {
            "productId": 2,
            "productName": "shoes",
            "retailer": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 40000,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        
    ])

    backOnPress= ()=> {
        navigation.goBack()
        } 
    
    searchPress = () => {
        AsyncStorage.removeItem("ProductsByCategory")
        AsyncStorage.setItem('similarProducts', searchText)
        .then(() => navigation.navigate("ProductList"))
        .catch(error => console.log("searchPress for search AsyncStorage error"));
    }

    const keyExtractor = (item) => item.productId;

    const routeToProductList = (index) => {
        AsyncStorage.removeItem("ProductsByCategory")
        AsyncStorage.setItem('similarProducts', filterProducts[index].productName)
        .then(() => navigation.navigate("ProductList"))
        .catch(error => console.log("routeToProductList for search AsyncStorage error"));
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => routeToProductList(index)} style={{height: 85, width: 400, borderBottomColor: "grey", borderBottomWidth: 1, backgroundColor: ProjectColors.white, flexDirection: "row"}}>
            <View style={{width: 80, height: 80, alignSelf: "center"}}>
                <Image style={{width: 80, height: 80}} source={{uri: item.productImageURL}}></Image>
            </View>
        
            <Text style={{alignSelf: "center", color: "black", fontFamily: "bold", fontSize: 15, alignSelf: "center", marginLeft: 10}}>{item.productName}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.mint, flex: 1}}>
            <View style={styles.searchBar}>
                <TouchableOpacity onPress={backOnPress} style={{position: "absolute", bottom: 12, right: 360}}>
                    <View>
                        <Image styles={styles.searchIcon} source={require('../assets/icons8-left-24.png')}></Image>
                    </View>
                </TouchableOpacity>
                <TextInput autoFocus={true} placeholder="please enter product name " onChangeText={text => handleSearchText(text)} value={searchText} style={{ width: 310, position: "absolute", bottom: 1, right: 40}}>
                </TextInput>
                <TouchableOpacity onPress={searchPress} style={{position: "absolute", bottom: 12, right: 10}}>
                    <View>
                        <Image styles={styles.searchIcon} source={require('../assets/icons8-search-30.png')}></Image>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filterProducts}
                renderItem={renderItem}
                keyExtractor={item => item.productId}
                style={styles.container}
                keyboardShouldPersistTaps="handled"
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    searchIcon: {
        width: 100,
        height: 100,
      },

      container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        paddingTop: 3,
        marginBottom: 3
    },

    searchBar: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: ProjectColors.white
    }
})

export default Search;