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
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = {
  name: 'Dairymilk',
  description: 'good one',
  price: '10',
  url: 'https://pngimage.net/wp-content/uploads/2018/05/beach-png-background-2.png',
};
const ProductInfo = ({route, navigation}) => {
  const [edit, setEdit] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  let userId = 1;
  const [productImageURL, setProductImageURL] = useState('');
  const [productQuantity, setProductQuantity] = useState();
  //   const [retailerinput,setRetailerInput]=useState({categoryId: ,productName:'',productDescription:'',productPrice: ,productImageURL:"",productQuantity:,userId:,})
  //   const changeHandler = e => {
  //     setRetailerInput( prevValues => {
  //     return { ...prevValues,[e.target.name]: e.target.value}
  //  })};

  const edithandler2 = () => {
    setEdit(!edit);
  };
  const saveHandler = async () => {
    setEdit(false);
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      userId = parsed.id;
      alert(userId);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-500}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{justifyContent: 'flex-end'}}>
          <View>
            <Text style={{fontSize: 15, color: 'black', marginTop: 5}}>
              Please provide the details of the product you have to sell
            </Text>
          </View>

          <View style={styles.sectionView}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
              }}>
              <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
                Product details
              </Text>
              <TouchableOpacity>
                <Text
                  style={{color: 'blue', fontSize: 19, textAlign: 'right'}}
                  onPress={edithandler2}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={styles.textInput}>
                <Text style={styles.text}>Category id:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={edit ? 'enter categoryid' : ''}
                  value={categoryId}
                  editable={edit}
                  onChangeText={input => {
                    setCategoryId(input);
                    // setProductName(data.name);
                  }}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Product Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={edit ? 'enter productName' : ''}
                  value={productName}
                  editable={edit}
                  onChangeText={input => {
                    setProductName(input);
                    // setProductName(data.name);
                  }}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Description:</Text>

                <TextInput
                  style={[styles.input, {width: 200}]}
                  placeholder={edit ? 'enter productDescription' : ''}
                  value={productDescription}
                  editable={edit}
                  onChangeText={input => {
                    setProductDescription(input);
                    // setProductDescription(data.description);
                  }}
                  multiline
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Price:</Text>

                <TextInput
                  style={styles.input}
                  placeholder={edit ? 'enter productPrice' : ''}
                  keyboardType="numbers-and-punctuation"
                  value={productPrice}
                  editable={edit}
                  onChangeText={input => {
                    setProductPrice(input);
                    // setProductPrice(data.price);
                  }}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.text}>Product URL:</Text>
                <TextInput
                  style={[styles.input, {height: 60, width: 200}]}
                  placeholder={
                    edit ? 'enter productimage url in string format' : ''
                  }
                  value={productImageURL}
                  editable={edit}
                  onChangeText={input => {
                    setProductImageURL(input);
                    // setProductName(data.name);
                  }}
                  multiline
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Quantity:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={edit ? 'enter quantity' : ''}
                  value={productQuantity}
                  editable={edit}
                  keyboardType="numbers-and-punctuation"
                  onChangeText={input => {
                    setProductQuantity(input);
                    // setProductName(data.name);
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={edit ? false : true}
            onPress={saveHandler}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 15,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: '#2874F0',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  input: {
    margin: 15,
    height: 60,
    width: 200,
    borderColor: '#DADADA',
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
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    height: 520,
    alignContent: 'center',
  },
  image: {
    maxHeight: 30,
    maxWidth: 30,
    alignSelf: 'center',
  },
});
export default ProductInfo;
