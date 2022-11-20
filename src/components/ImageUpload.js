import React, {useEffect, useState} from 'react';
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
  Platform,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import firebaseConfig from '../../firebaseConfig.js';
import {initializeApp} from 'firebase/app'; //validate yourself
import {
  getStorage,
  ref,
  uploadBytes,
  getBlob,
  listAll,
  getDownloadURL,
} from 'firebase/storage';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePicker,
} from 'react-native-image-picker';

initializeApp(firebaseConfig);

const ImageUpload = () => {
  const [filePath, setFilePath] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  let options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      let source = response;
      //console.log('iamge Uri,', source.assets[0].uri);
      setFilePath(source);
    });
  };

  const uploadImageToFirebase = async () => {
    console.log('Inside firebase');
    const imageName = filePath.assets[0].fileName;
    const storage = getStorage(); //the storage itself
    const ref1 = ref(storage, `images/${imageName}`); //how the image will be addressed inside the storage
    const imagesListRef = ref(storage, 'images/');
    //convert image to array of bytes
    const img = await fetch(filePath.assets[0].uri);
    const bytes = await img.blob();

    uploadBytes(ref1, bytes).then(snapshot => {
      listAll(imagesListRef).then(response => {
        response.items.forEach(item => {
          if (item?._location?.path_ === `images/${imageName}`) {
            getDownloadURL(item).then(url => {
              console.log('now here', url);
              setImageUrl(url);
            });
          }
        });
      });
    });
    console.log('file Uploaded');
  };

  const renderFileData = () => {
    if (
      filePath &&
      Object.keys(filePath).length === 0 &&
      Object.getPrototypeOf(filePath) === Object.prototype
    ) {
      //console.log('I am heara', filePath);
      return (
        <Image source={require('../assets/cart.png')} style={styles.image} />
      );
    } else {
      //console.log('Image is set', filePath.assets[0].uri);
      return (
        <Image source={{uri: filePath.assets[0].uri}} style={styles.image} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>{renderFileData()}</View>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImageToFirebase}>
        <Text style={styles.button}>Upload To Firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Clipboard.setString(imageUrl)}>
        <View>
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              fontFamily: 'Arial',
              fontStyle: 'bold',
              textAlign: 'center',
              marginTop: 3,
              marginLeft: 25,
              marginBottom: 17,
            }}>
            {imageUrl}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
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
});

export default ImageUpload;
