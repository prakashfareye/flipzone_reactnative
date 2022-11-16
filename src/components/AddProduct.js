import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const data = {
    name: 'Dairymilk',
    description: 'good one',
    price: '10',
    url: 'https://pngimage.net/wp-content/uploads/2018/05/beach-png-background-2.png',
  };
  const AddProduct = ({route, navigation}) => {
    const {userId} = route.params;
  
    const [edit, setEdit] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState();
    const [categoryId, setCategoryId] = useState();
    const [brand, setBrand] = useState('');
    //let userId = 1;
    const [productImageURL, setProductImageURL] = useState('');
    const [productQuantity, setProductQuantity] = useState();
    //   const [retailerinput,setRetailerInput]=useState({categoryId: ,productName:'',productDescription:'',productPrice: ,productImageURL:"",productQuantity:,userId:,})
    //   const changeHandler = e => {
    //     setRetailerInput( prevValues => {
    //     return { ...prevValues,[e.target.name]: e.target.value}
    //  })};
  
    const saveHandler = async () => {
      try {
        //  let user = await AsyncStorage.getItem('user');
        //  let parsed = JSON.parse(user);
        //  const userId = parsed.id;
        console.log('uuuuuuuuuu', userId);
        const data = {
          userId: userId,
          categoryId: categoryId,
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice,
          productImageURL: productImageURL,
          productQuantity: productQuantity,
          brand: brand,
        };
        fetch('http://10.0.2.2:8085/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(response => {
          console.log(response.status, response.ok);
          alert('saved');
        });
      } catch (error) {
        alert(error);
      }
      setCategoryId();
      setProductName('');
      setProductDescription('');
      setProductImageURL('');
      setProductPrice();
      setProductQuantity();
    };
  
    return (
      <ScrollView>
        <View style={styles.sectionView}>
          <View style={styles.headerText}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
              Product details
            </Text>
          </View>
  
          <View style={styles.itemView}>
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Product Name"
                value={productName}
                onChangeText={input => {
                  setProductName(input);
                  // setProductName(data.name);
                }}
              />
            </View>
  
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Product Description"
                value={productDescription}
                onChangeText={input => {
                  setProductDescription(input);
                  // setProductDescription(data.description);
                }}
                multiline
              />
            </View>
  
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Product Brand"
                value={brand}
                onChangeText={input => {
                  setBrand(input);
                  // setProductDescription(data.description);
                }}
              />
            </View>
  
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Product Price"
                keyboardType="numbers-and-punctuation"
                value={productPrice}
                onChangeText={input => {
                  setProductPrice(input);
                  // setProductPrice(data.price);
                }}
              />
            </View>
  
            <View style={styles.textInputImageView}>
              <TextInput
                style={styles.inputImage}
                placeholder="Enter Product Image Url"
                value={productImageURL}
                onChangeText={input => {
                  setProductImageURL(input);
                  // setProductName(data.name);
                }}
                multiline
              />
              <TouchableOpacity
                style={styles.buttonNew}
                onPress={() => {
                  navigation.navigate('Upload Image');
                }}>
                <Text>Upload</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Quantity"
                value={productQuantity}
                keyboardType="numbers-and-punctuation"
                onChangeText={input => {
                  setProductQuantity(input);
                  // setProductName(data.name);
                }}
              />
            </View>
  
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Category id"
                value={categoryId}
                onChangeText={input => {
                  setCategoryId(input);
                  // setProductName(data.name);
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              saveHandler();
            }}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      fontSize: 15,
      padding: 10,
      width: 200,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 30,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#2874F0',
      borderRadius: 10,
      textAlign: 'center',
    },
    buttonNew: {
      fontSize: 15,
      padding: 10,
      width: 70,
      height: 60,
      maxHeight: 70,
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#2874F0',
      borderRadius: 10,
      textAlign: 'center',
    },
    text: {
      color: 'black',
      fontSize: 15,
      alignSelf: 'center',
    },
    textInput: {
      width: '100%',
    },
    textInputImageView: {
      width: '95%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputImage: {
      margin: 15,
      paddingLeft: 10,
      height: 60,
      width: '70%',
      borderColor: '#000',
      borderRadius: 10,
      borderWidth: 1,
      color: 'black',
    },
    input: {
      margin: 15,
      paddingLeft: 10,
      height: 60,
      borderColor: '#000',
      borderRadius: 10,
      borderWidth: 1,
      color: 'black',
    },
    sectionView: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      height: '96%',
      width: '95%',
    },
    image: {
      maxHeight: 30,
      maxWidth: 30,
      alignSelf: 'center',
    },
    headerText: {
      fontSize: 20,
      paddingTop: 0,
      fontWeight: 'bold',
      color: '#000',
    },
    itemView: {
      backgroundColor: 'white',
      flexDirection: 'column',
      // justifyContent: 'space-between',
    },
  });
  export default AddProduct;