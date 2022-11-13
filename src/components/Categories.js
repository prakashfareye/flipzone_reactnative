import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
const category = [
  {
    id: 1,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 2,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 3,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 4,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 5,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 6,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
  {
    id: 7,
    name: 'shoes',
    imageUrl:
      'https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png',
  },
];
const Categories = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={{justifyContent: 'space-evenly', marginLeft: 15}}>
        <FlatList
          data={category}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                height: 200,
                width: 175,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                marginHorizontal: 4,
                marginVertical: 6,
                backgroundColor: 'white',
                elevation: 3,
              }}
              onPress={() => {
                navigation.navigate('ProductInfo');
              }}>
              <View style={{width: 170, height: 170, alignSelf: 'center'}}>
                <Image
                  style={{width: 170, height: 170}}
                  source={{uri: item.imageUrl}}></Image>
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontFamily: 'bold',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default Categories;
