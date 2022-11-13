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
} from 'react-native';
import React, {useState} from 'react';
const data = {
  name: 'Dairymilk',
  description: 'good one',
  price: '10',
  url: 'https://pngimage.net/wp-content/uploads/2018/05/beach-png-background-2.png',
};
const ProductInfo = ({route, navigation}) => {
  const [edit1, setEdit1] = useState(true);
  const [edit2, setEdit2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [url, setUrl] = useState();
  const edithandler1 = () => {
    setEdit1(!edit1);
  };
  const edithandler2 = () => {
    setEdit2(!edit2);
  };
  const saveHandler = () => {
    setEdit1(true);
    setEdit2(false);
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

          <View style={[styles.sectionView, {height: 190}]}>
            <TouchableOpacity>
              <Text
                style={{color: 'blue', fontSize: 19, textAlign: 'right'}}
                onPress={edithandler1}>
                Edit
              </Text>
            </TouchableOpacity>

            {edit1 ? (
              <View>
                <Image
                  style={{alignSelf: 'center', height: 130, width: 130}}
                  // source={require('../../assets/home.png')}
                  source={{uri: data.url}}
                  //  source={{uri:url}}
                />
              </View>
            ) : (
              <View style={[styles.textInput, {flexDirection: 'column'}]}>
                <TouchableOpacity
                  onPress={input => {
                    setEdit1(true);
                    setUrl(input);
                  }}>
                  <TextInput
                    style={styles.input}
                    placeholder={!edit1 ? 'enter url in string format' : ''}
                    value={url}
                    editable={!edit1}
                    onChangeText={input => {
                      // setUrl(input);
                      setUrl(data.url);
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.textInput}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/photo.png')}
                  />

                  <Text>Upload photo</Text>
                </View>
              </View>
            )}
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
                <Text style={styles.text}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={edit2 ? 'enter name' : ''}
                  value={name}
                  editable={edit2}
                  onChangeText={input => {
                    // setName(input);
                    setName(data.name);
                  }}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Description:</Text>

                <TextInput
                  style={styles.input}
                  placeholder={edit2 ? 'enter description' : ''}
                  value={description}
                  editable={edit2}
                  onChangeText={input => {
                    // setDescription(input);
                    setDescription(data.description);
                  }}
                  // multiline
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.text}>Price:</Text>

                <TextInput
                  style={styles.input}
                  placeholder={edit2 ? 'enter price' : ''}
                  keyboardType="numbers-and-punctuation"
                  value={price}
                  editable={edit2}
                  onChangeText={input => {
                    // setPrice(input);
                    setPrice(data.price);
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={edit1 && !edit2 ? false : true}
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
    height: 40,
    width: 150,
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
    height: 300,
    alignContent: 'center',
  },
  image: {
    maxHeight: 30,
    maxWidth: 30,
    alignSelf: 'center',
  },
});
export default ProductInfo;
