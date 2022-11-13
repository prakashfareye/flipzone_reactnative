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

const Search = (props) => {

    const [searchText, setSearchText] = useState("")

    const handleSearchText = (text) => {
        setSearchText(text)
        setFilterProducts([        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        }])
    }

    const [filterProducts, setFilterProducts] = useState([
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 2,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 3,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 4,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        
    ])

    const keyExtractor = (item) => item.id;

    const routeToProductList = (index) => {

    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => routeToProductList(index)} style={{height: 85, width: 400, borderBottomColor: "grey", borderBottomWidth: 1, backgroundColor: ProjectColors.white, flexDirection: "row"}}>
            <View style={{width: 80, height: 80, alignSelf: "center"}}>
                <Image style={{width: 80, height: 80}} source={{uri: item.imageUrl}}></Image>
            </View>
        
            <Text style={{alignSelf: "center", color: "black", fontFamily: "bold", fontSize: 15, alignSelf: "center", marginLeft: 10}}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{backgroundColor: ProjectColors.mint, flex: 1}}>
            <View style={styles.searchBar}>
                <TouchableOpacity style={{position: "absolute", bottom: 12, right: 360}}>
                    <View>
                        <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                    </View>
                </TouchableOpacity>
                <TextInput placeholder="please enter product name " onChangeText={text => handleSearchText(text)} value={searchText} style={{ width: 310, position: "absolute", bottom: 1, right: 40}}>
                </TextInput>
                <TouchableOpacity style={{position: "absolute", bottom: 12, right: 10}}>
                    <View>
                        <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filterProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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