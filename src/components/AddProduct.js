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
import { IP } from './AndroidIP'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProjectColors} from './colors/ProjectColors';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Smart Phones', value: '1'},
  {label: 'Dress Female', value: '2'},
  {label: 'Headphones', value: '3'},
  {label: 'Jeans Men', value: '4'},
  {label: 'Laptop', value: '5'},
  {label: 'Shoes', value: '6'},
  {label: 'Smart Watch', value: '7'},
  {label: 'Socks', value: '8'},
  {label: 'T-Shirt', value: '9'},
  {label: 'Wallet', value: '10'},
];

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

  const [isFocus, setIsFocus] = useState(false);
  // const [categoryData, setCategoryData] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://10.0.2.2:8085/category')
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       setCategoryData(responseJson);
  //       console.log('categoryData', responseJson);
  //       categoryData?.map(item => {
  //         setData([
  //           ...data,
  //           {
  //             label: item.productCategoryName,
  //             value: item.productCategoryId,
  //           },
  //         ]);
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  // const renderLabel = () => {
  //   categoryData?.map(item => {
  //     setData([
  //       ...data,
  //       {
  //         label: item.productCategoryName,
  //         value: item.productCategoryId,
  //       },
  //     ]);
  //   });
  // };

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
      if(userId==null || categoryId==null || productName=='' || productDescription!='' 
      || productPrice=='' || productImageURL=='' || productQuantity==null){ alert("invalid details");}else{
      fetch(`http://${IP}:8085/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => {
        console.log(response.status, response.ok);
        alert('saved');
      });
    }} catch (error) {
      alert(error);
    }
    setCategoryId();
    setProductName('');
    setProductDescription('');
    setProductImageURL('');
    setProductPrice();
    setProductQuantity();
    setBrand('');
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

          <View style={styles.dropdownContainer}>
            {/* {renderLabel()} */}
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Category' : '...'}
              searchPlaceholder="Search..."
              value={categoryId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCategoryId(item.value);
                setIsFocus(false);
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
  dropdownContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  dropdown: {
    height: 50,
    borderColor: ProjectColors.grey,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
export default AddProduct;
