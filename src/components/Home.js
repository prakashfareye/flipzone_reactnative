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

const Home = (props) => {

    const [productCategories, setProductCategories] = useState([
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        },
        {
            "id": 1,
            "name": "shoes",
            "imageUrl": "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
        }
    ])

    const keyExtractor = (item) => item.id;

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{height: 200, width: 175, flexDirection: "column", justifyContent: "space-evenly", marginHorizontal: 4, marginVertical: 6, backgroundColor: ProjectColors.white, elevation: 3}}>
            <View style={{width: 170, height: 170, alignSelf: "center"}}>
                <Image style={{width: 170, height: 170}} source={{uri: item.imageUrl}}></Image>
            </View>
        
            <Text style={{alignSelf: "center", color: "black", fontFamily: "bold"}}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (

    
    <SafeAreaView>    
        <View style={props.style==undefined ? styles.defaultStyle : props.style}>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                <TouchableOpacity style={{alignSelf: "center"}}>
                    <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                </TouchableOpacity>
                <Text style={{color: ProjectColors.white}}>Logout</Text>
            </View>
            <TouchableOpacity style={styles.searchBar}>
                <View style={{position: "absolute", bottom: 6, right: 315 }}>
                    <Image styles={styles.searchIcon} source={require('../assets/open.png')}></Image>
                </View>
                <View style={{flexDirection: "row", position: "absolute", bottom: 6, right: 65 }}>
                    <Text style={{color: "grey", alignSelf: "center"}}>Please enter product name</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{height: 665, backgroundColor: ProjectColors.teal, flexDirection: "column"}}>
        <FlatList
            data={productCategories}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.container}
            contentContainerStyle={styles.list}
            numColumns={2}
        />
        </View>
    </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 100,
        backgroundColor: ProjectColors.navy
    },

    searchBar: {
        width: 350,
        height: 40,
        backgroundColor: ProjectColors.white,
        alignSelf: "center"
    },

    searchIcon: {
        width: 100,
        height: 100,
      },
    
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        paddingTop: 5
    },

    list: {
        justifyContent: 'space-around',
    },

})

export default Home;