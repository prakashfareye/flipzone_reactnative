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
import { SearchBar } from 'react-native-elements';
import { fonts } from 'react-native-elements/dist/config';
import ProductHeader from './ProductHeader'

import {ProjectColors} from './colors/ProjectColors';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductList = ( { navigation, route } ) => {

    const drawer = useRef(null);

    const [title, setTitle] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('ProductsByCategory')
        .then((result) => {
            if(result != undefined) {
                result = JSON.parse(result)
                setTitle(result.productCategoryName)
                fetch('http://10.0.2.2:8085/product/c/' + result.productCategoryId, {
                    method: 'GET',
                    })
                    .then(response => response.json())
                    .then(data => {
                        setFullProducts(data)
                        setProducts(data)
                    })
                    .catch(error => console.log('get all categories api fail ', error));
            } else {
                console.log("similarProducts")
                AsyncStorage.getItem('similarProducts')
                .then((result) => {
                    if(result != undefined) {
                        console.log(result)
                        setTitle(result)
                        fetch('http://10.0.2.2:8085/product/search/' + result, {
                            method: 'GET',
                            })
                            .then(response => response.json())
                            .then(data => {
                                setFullProducts(data)
                                setProducts(data)
                            })
                            .catch(error => console.log('get similarProducts api fail ', error));
                    }
                })

            }
        })
        .catch(error => console.log("ProductList AsyncStorage  error"));
    }, [])

    const navigationView = () => (
        <View style={{position: "absolute", bottom: 275, right: 65, lexDirection: "column", justifyContent: "space-evenly", height: 200, width: 200}}>
            { !isSort && 
            <View style={{justifyContent: "space-evenly", flexDirection: "column"}}> 
                <TouchableOpacity onPress={() => typePress(1)} style={{backgroundColor: filterBy==1 ? ProjectColors.navy : "white", height: 50, width: 200, justifyContent: "center", alignSelf: "center", borderWidth: 1}}>
                        <Text style={{color: filterBy==1 ? "white" : "black", alignSelf: "center"}}>Price below $20000</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => typePress(2)} style={{backgroundColor: filterBy==2 ? ProjectColors.navy : "white", height: 50, width: 200, justifyContent: "center", alignSelf: "center", marginTop: 10, borderWidth: 1}}>
                        <Text style={{color: filterBy==2 ? "white" : "black", alignSelf: "center"}}>Price above $20000</Text>
                </TouchableOpacity>
            </View>
            }
            { isSort &&       
           <View style={{justifyContent: "space-evenly", flexDirection: "column"}}> 
                <TouchableOpacity onPress={() => typePress(1)} style={{backgroundColor: sortBy==1 ? ProjectColors.navy : "white", height: 50, width: 200, justifyContent: "center", alignSelf: "center", borderWidth: 1}}>
                        <Text style={{color: sortBy==1 ? "white" : "black", alignSelf: "center"}}>Price - Low To High</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => typePress(2)} style={{backgroundColor: sortBy==2 ? ProjectColors.navy : "white", height: 50, width: 200, justifyContent: "center", alignSelf: "center", marginTop: 10, borderWidth: 1}}>
                        <Text style={{color: sortBy==2 ? "white" : "black", alignSelf: "center"}}>Price - High To Low</Text>
                </TouchableOpacity>
            </View>
                }
        </View>
      );

    const [isSort, setIsSort] = useState(true)
    const [sortBy, setSortBy] = useState(0)
    const [filterBy, setFilterBy] = useState(0)
    const [fullProducts, setFullProducts] = useState([
        {
            "productId": 1,
            "productName": "shoes",
            "brand": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 30000,
            "productDescription": "key feature 1,key feature 2222222,key feature 353434353"
        },
        {
            "productId": 2,
            "productName": "shoes",
            "brand": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 40000,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        {
            "productId": 3,
            "productName": "shoes",
            "brand": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 100,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        {
            "productId": 4,
            "productName": "shoes",
            "brand": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 10,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
    ])


    const typePress = (type) => {
        if(isSort) {
            if(sortBy == type) {
                setSortBy(0)
                filteredProducts = [...fullProducts]
                if(filterBy == 1) {
                    filteredProducts = filteredProducts.filter(function(product)
                    {
                     return product.productPrice <= 20000;
                    });                    
                } else if(filterBy == 2) {
                    filteredProducts = filteredProducts.filter(function(product)
                    {
                     return product.productPrice > 20000;
                    });
                }
                setProducts(filteredProducts)
            } else {
                setSortBy(type)
                sortedProducts = [...products]
                if(type == 1) {
                    sortedProducts.sort((a,b) => a.productPrice - b.productPrice)
                } else {
                    sortedProducts.sort((a,b) => b.productPrice - a.productPrice)
                }
                setProducts(sortedProducts)

            }
        } else {
            if(filterBy == type) {
                setFilterBy(0)
                sortedProducts= [...fullProducts]
                if(sortBy == 1) {
                    sortedProducts.sort((a,b) => a.productPrice - b.productPrice)
                } else if(sortBy == 2) {
                    sortedProducts.sort((a,b) => b.productPrice - a.productPrice)
                } 
                setProducts(sortedProducts)

            } else {
                setFilterBy(type)
                filteredProducts = [...fullProducts]
                if(type == 1) {
                    filteredProducts = filteredProducts.filter(function(product)
                    {
                     return product.productPrice <= 20000;
                    });                
                } else {
                    filteredProducts = filteredProducts.filter(function(product)
                    {
                     return product.productPrice > 20000;
                    });
                }
                if(sortBy == 1) {
                    filteredProducts.sort((a,b) => a.productPrice - b.productPrice)
                } else if(sortBy == 2) {
                    filteredProducts.sort((a,b) => b.productPrice - a.productPrice)
                }
                setProducts(filteredProducts)
            }
        }
        drawer.current.closeDrawer();
 
    }
    const sortPress = () => {
        setIsSort(true)
        drawer.current.openDrawer()
    }

    const filterPress = () => {
        setIsSort(false)
        drawer.current.openDrawer()
    }

    const [products, setProducts] = useState([
        {
            "productId": 1,
            "productName": "shoes",
            "brand": "retailer",
            "productQuantity": 5,
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 30000,
            "productDescription": "key feature 1,key feature 2222222,key feature 353434353"
        },
        {
            "productId": 2,
            "productName": "shoes",
            "brand": "retailer",
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 40000,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        {
            "productId": 3,
            "productName": "shoes",
            "brand": "retailer",
            "productQuantity": 5,
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 100,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        {
            "productId": 4,
            "productName": "shoes",
            "retailbrander": "retailer",
            "productQuantity": 5,
            "productImageURL": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "productPrice": 10,
            "productDescription": "key feature 1,key feature 2,key feature 3"
        },
        
    ])

    const productCardPress = (index) => {
        console.log(products[index])
        AsyncStorage.setItem('ProductFeatures', JSON.stringify(products[index]))
        .then(() => navigation.navigate("Product"))
        .catch(error => console.log("productCardPress AsyncStorage error", error));
    }

    const keyExtractor = (item) => item.productId;

    const renderItem = ({ item, index }) => (
        <View>
        <TouchableOpacity onPress={() => productCardPress(index)} delayPressIn={75} style={{height: 225, width: 375, backgroundColor: ProjectColors.white, marginBottom: 10}}>
            <View style={{width: 150, height: 200, position: "absolute", top: 10, left: 5, borderWidth: 0.5}}>
                <Image style={{width: 150, height: 200}} source={{uri: item.productImageURL}}></Image>
            </View>
            <View style={{width: 200, position: "absolute", top: 5, right: 10, flexDirection: "column"}}>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 20, fontWeight: "500"}}>{item.productName}</Text>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 15, paddingTop: 10}}>Brand: <Text style={{textTransform: 'lowercase'}}>{item.brand}</Text></Text>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800", paddingTop: 10}}>$ <Text>{item.productPrice}</Text></Text>
            </View>
            </TouchableOpacity>
        </View>
    
        
    
    )



    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.mint, flex: 1}}>
            <ProductHeader productHeaderNavigation={navigation} title={title}></ProductHeader>
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition='left'
                renderNavigationView={navigationView}
            >
                <View style={{flexDirection: "row", justifyContent: "space-evenly", marginVertical: 5}}>
                    <TouchableOpacity onPress={sortPress} style={styles.button}>
                        <Text style={styles.buttonText}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={filterPress} style={styles.button}>
                        <Text style={styles.buttonText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.productId}
                    style={styles.container}
                />
            </DrawerLayoutAndroid>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",},

    button: {
        marginVertical: 2.5,
        backgroundColor: ProjectColors.navy,
        height: 40,
        width: 150,
        borderRadius: 10,
        justifyContent: "center"
      },
    
      buttonText: {
        color: "white",
        alignSelf: "center"
      },

    searchIcon: {
        width: "100%",
        height: "100%",
      },
    
      searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: ProjectColors.white
    }

})

export default ProductList;