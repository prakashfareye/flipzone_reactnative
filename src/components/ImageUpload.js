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
  const [url, setUrl] = React.useState('');

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
      console.log(response);
      setUrl(response.url);
      if (response != null) {
        const storage = getStorage(); //the storage itself
        const ref1 = ref(storage, 'image.jpg'); //how the image will be addressed inside the storage

        //convert image to array of bytes
        const img = fetch(response.uri);
        const bytes = img.blob();

        uploadBytes(ref1, bytes); //upload images
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Text>Pick Image and Upload File</Text>
      </TouchableOpacity>
      <Text>{url}</Text>
    </View>
  );
};

export default ImageUpload;