import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
const data = [
  {id: '1', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '2', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '3', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '6', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '4', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '5', name: 'dairymilk', description: 'good one', price: '10'},
];
const Listing = ({route, navigation}) => {
  return (
    <View style={styles.sectionView}>
      <View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          My Listing
        </Text>

        <FlatList
          data={data}
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
              navigation.navigate('Categories');
            }}>
            Add New Product
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 15,
    width: 200,
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
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
});
export default Listing;
