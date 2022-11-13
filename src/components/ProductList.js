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

const ProductList = () => {

    const drawer = useRef(null);

    const navigationView = () => (
        <View style={{position: "absolute", bottom: 275, right: 65, lexDirection: "column", justifyContent: "space-evenly", height: 200, width: 200}}>
            { !isSort && 
            <View style={{justifyContent: "space-evenly", flexDirection: "column", height: 200, width: 200}}> 
                <TouchableOpacity style={{ }} onPress={() => typePress(1)}>     
                    <View style={{flexDirection: "column", alignSelf: "center", height: 75, width: 200, borderWidth: 1, backgroundColor: filterBy==1 ? ProjectColors.mint : "white"}}>
                        
                            <Text style={{alignSelf: "center"}}>price - low to high</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => typePress(2)}>
                    <View style={{flexDirection: "column", alignSelf: "center", height: 75, width: 200, borderWidth: 1, backgroundColor: filterBy==2 ? ProjectColors.mint : "white"}}>
                        < Text style={{alignSelf: "center"}}>price - high to low</Text>
                    </View>
                </TouchableOpacity>

            </View>
            }
            { isSort &&       
            <View style={{justifyContent: "space-evenly", flexDirection: "column", height: 200, width: 200}}>
                <TouchableOpacity style={{ }} onPress={() => typePress(1)}>

                    <View style={{flexDirection: "column", alignSelf: "center", height: 75, width: 200, borderWidth: 1, backgroundColor: sortBy==1 ? ProjectColors.mint : "white"}}>
                            <Text style={{alignSelf: "center"}}>price - low to high</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{}} onPress={() => typePress(2)}>

                    <View style={{flexDirection: "column", alignSelf: "center", height: 75, width: 200, borderWidth: 1, backgroundColor: sortBy==2 ? ProjectColors.mint : "white"}}>
                        <Text style={{alignSelf: "center"}}>price - high to low</Text>
                    </View>
                </TouchableOpacity>

            </View>
                }
        </View>
      );

    const [isSort, setIsSort] = useState(true)
    const [sortBy, setSortBy] = useState(0)
    const [filterBy, setFilterBy] = useState(0)


    const typePress = (type) => {
        console.log("me")
        if(isSort) {
            setSortBy(type)
        } else {
            setFilterBy(type)
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
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "price": 10000,
            "description": "key feature 1, key feature 2, key feature 3"
        },
        {
            "id": 2,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "price": 10000,
            "description": "key feature 1, key feature 2, key feature 3, aasss"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "price": 10000,
            "description": "key feature 1, key feature 2, key feature 3, aasss"
        },
        {
            "id": 3,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
            "price": 10000,
            "description": "key feature 1, key feature 2, key feature 3, aasss"
        },
    ])

    const keyExtractor = (item) => item.id;

    const renderItem = ({ item }) => (
        <TouchableOpacity delayPressIn={75} style={{height: 300, width: 375, elevation: 3, backgroundColor: ProjectColors.white, marginBottom: 10}}>
            <View style={{width: 150, height: 150, position: "absolute", bottom: 145, right: 220, borderWidth: 0.5}}>
                <Image style={{width: 150, height: 150}} source={{uri: item.imageUrl}}></Image>
            </View>
            <View style={{justifyContent: "space-evenly", width: 200, height: 150, position: "absolute", bottom: 145, right: 10, flexDirection: "column"}}>
                <Text style={{color: "black", textTransform: 'uppercase', fontSize: 15}}>{item.name}</Text>
                <Text style={{color: "black", fontSize: 25, alignSelf: "center", fontWeight: "800"}}>$ <Text>{item.price}</Text></Text>
            </View>
            <View style={{justifyContent: "space-evenly", height: 135, position: "absolute", bottom: 2, right: 240, flexDirection: "column"}}>
                {item.description.split(",").map((feature, index) => {
                    if(index<3){
                    return (      
                        <View style={{borderWidth: 1, borderColor: "grey", borderStyle: "dotted"}}>
                            <Text style={{color: "grey"}}> {feature} </Text>
                        </View>
                        )}
                })
                }
            </View>
        </TouchableOpacity>
    
    )


    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.navy, flex: 1}}>
            <ProductHeader></ProductHeader>
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition='left'
                renderNavigationView={navigationView}
            >
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
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
                    keyExtractor={item => item.id}
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
        alignSelf: "center",
        marginBottom: 3
    },

    button: {
        marginVertical: 2.5,
        backgroundColor: ProjectColors.mint,
        height: 40,
        width: 150,
        borderRadius: 10,
        justifyContent: "center"
      },
    
      buttonText: {
        color: "black",
        alignSelf: "center"
      },

    searchIcon: {
        width: 100,
        height: 100,
      },
    
      searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: ProjectColors.white
    }

})

export default ProductList;