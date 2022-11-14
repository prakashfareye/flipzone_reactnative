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
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';

const data = [
  {id: '1', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '2', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '3', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '6', name: 'kitkat', description: 'good one', price: '10'},
  {id: '4', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '5', name: 'dairymilk', description: 'good one', price: '10'},
];
const Listing = ({route, navigation}) => {
  const [list, setList] = useState(data);
  const [filterby, setFilterBy] = useState();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.sectionView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setList(data);
                }}>
                <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
                  My Listing
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={[styles.input, {marginTop: 0}]}
                placeholder={'Search by product name'}
                value={filterby}
                onChangeText={input => {
                  setFilterBy(input);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setList(data.filter(data => data.name == filterby));
                  setFilterBy('');
                }}>
                <Image
                  style={styles.image}
                  source={require('../../assets/filter.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{marginTop: -150}}
            data={list}
            renderItem={({item}) => (
              <View
                style={[
                  styles.sectionView,
                  {height: 60, backgroundColor: '#DADADA'},
                ]}>
                <Text style={{color: 'black'}}>
                  {item.name}
                  <Text> {item.price}</Text>
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View>
          <TouchableHighlight style={styles.button}>
            <Text
              style={{color: 'white', textAlign: 'center'}}
              onPress={() => {
                navigation.navigate('ProductInfo');
              }}>
              Add New Product
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 15,
    width: 200,
    padding: 10,
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
  input: {
    margin: 15,
    height: 40,
    width: 160,
    borderColor: '#DADADA',
    borderWidth: 1,
    color: 'black',
  },
  textInput: {
    flexDirection: 'row',
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
    height: 500,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  image: {
    maxHeight: 30,
    maxWidth: 30,
    alignSelf: 'center',
  },
});
export default Listing;
