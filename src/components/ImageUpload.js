import React from 'react';
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
} from 'react-native';

import firebaseConfig from '../../firebaseConfig.js';
import {initializeApp} from 'firebase/app'; //validate yourself
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

initializeApp(firebaseConfig);

const ImageUpload = () => {
  //const [url, setUrl] = React.useState({});

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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      // console.log(response);
      // setUrl(response);
      // if (response != null) {
      //   const storage = getStorage(); //the storage itself
      //   const ref1 = ref(storage, 'image.jpg'); //how the image will be addressed inside the storage

      //   //convert image to array of bytes
      //   const img = fetch(response.uri);
      //   const bytes = img.blob();

      //   uploadBytes(ref1, bytes); //upload images
      // }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          {
            //uri: 'data:image/jpeg;base64,' + url.uri,
          }
        }
      />
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Upload To Firebase</Text>
      </TouchableOpacity>
      <Text>{}</Text>
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
