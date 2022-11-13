import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
const category = ['categ1', 'categ2', 'categ3', 'categ4'];
const Categories = ({navigation}) => {
  return (
    <View style={{justifyContent: 'space-evenly'}}>
      <FlatList
        data={category}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={{flexDirection: 'column'}}>
              <Text
                style={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('ProductInfo');
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Categories;
