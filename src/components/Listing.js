import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { IP } from "./AndroidIP"
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Listing = ({route, navigation}) => {
  const [sortToggle, setSortToggle] = useState(true);
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState({});

 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('user')
        .then(result => {
          if (result != undefined) {
            result = JSON.parse(result);
            setUser(result);
            fetch(`http://${IP}:8085/product/u/${result.userId}`)
              .then(response => response.json())
              .then(responseJson => {
                console.log(responseJson)
                setFilterData(responseJson);
                setList(responseJson);
              })
              .catch(error =>
                console.log('get all categories api fail ', error),
              );
          } else {
            console.log('Login Again');
          }
        })
        .catch(error => console.log('ProductList AsyncStorage  error'));
    });
    return unsubscribe;
  }, [navigation]);



  const FilterHandler = text => {
    setFilterData(
      list.filter(data => {
        const itemdata = data.productName.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      }),
    );
  };

  const sortHandler=()=>{
    if(sortToggle)
    { filterData.sort((a,b)=>b.productPrice-a.productPrice);
      setSortToggle(!sortToggle);}
    else{
      filterData.sort((a,b)=>a.productPrice-b.productPrice);
      setSortToggle(!sortToggle)
    }
  }

  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.sectionView}>
        <View>
          <Text style={styles.headerText}>{`Hello, ${user.userName}`}</Text>
          <Text style={styles.headerSubText}>{`${user.userEmailId}`}</Text>
        </View>

        <View style={styles.textInput}>
          <View style={{flexDirection:'row'}}>
          <TextInput
            style={styles.input}
            placeholder={'Search by product name'}
         
            onChangeText={input => {
              FilterHandler(input);
            }}
          />
            <Image
              style={styles.image}
              source={require('../assets/search.png')}
            />
          </View>

          <TouchableOpacity
            onPress={
             sortHandler
            }>
            <Image
              style={[styles.image,{height:30,width:30,right:20}]}
              source={require('../assets/sort.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={filterData }
            renderItem={({item}) => (
              <View style={styles.listContainer}>
                <View style={styles.listItem}>
                  <View style={styles.imageView}>
                    <Image
                      source={{uri: item.productImageURL}}
                      style={styles.icon}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <View style={styles.titleBox}>
                      <Text style={styles.todoTitle}>{item.productName}</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                      <Text style={styles.descriptionText}>
                        `Price: {item.productPrice} , Quantity Left :
                        {item.productQuantity}`
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.productId}
          />
        </View>

        <View>
          <TouchableHighlight>
            <Text
              style={styles.button}
              onPress={() => {
                navigation.navigate('Add Product', {
                  userId: user.userId,
                });
              }}>
              Add New Product
            </Text>
          </TouchableHighlight>
        </View>
      </View>
       </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionView: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 3,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: '96%',
    width: '95%',
  },
  button: {
    fontSize: 15,
    width: 200,
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: '#2874F0',
    borderRadius: 10,
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    color: 'black',
    borderRadius: 10,
    paddingLeft: 10,
    
  },
  textInput: {
    flexDirection: 'row',
    marginTop: 30,
    
  },

  image: {
    maxHeight: 40,
    marginLeft: 10,
    maxWidth: 40,
    alignSelf: 'center',
  },
  flatListContainer: {
    backgroundColor: '#FFF',
    marginTop: 20,
    height: '68%',
  },
  headerText: {
    fontSize: 20,
    paddingTop: 0,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubText: {
    fontSize: 12,
    paddingTop: 0,
    color: '#000',
  },
  listContainer: {
    width: '98%',
    height: 80,
    shadowColor: '#000',
    shadowRadius: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 4,
    alignSelf: 'center',
  },
  listItem: {
    flex: 1,
    borderRadius: 10,
    direction: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageView: {
    flex: 1.2,
    justifyContent: 'center',
    alignContent: 'center',
    paddingStart: 10,
    alignSelf: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 8,
  },
  textBox: {
    flex: 5,
    //backgroundColor: '#F9F3FC',
    flexDirection: 'column',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  titleBox: {
    flex: 2,
    //backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingEnd: 10,
    marginEnd: 5,
  },
  descriptionBox: {
    flex: 5,
    paddingTop: 5,
  },
  todoTitle: {
    fontWeight: 'bold',
    color: '#000000',
  },
  todoDueDate: {
    fontSize: 12,
    color: '#000000',
    marginEnd: 10,
  },
  descriptionText: {
    fontSize: 11,
    color: '#677182',
    marginEnd: 10,
  },
});
export default Listing;
