import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import React from 'react';

const data = [
  {id: '1', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '2', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '3', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '6', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '4', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '5', name: 'dairymilk', description: 'good one', price: '10'},]

const Retailers = ({route, navigation}) => {
  const user = {name:'Balaji',phone:'1234567890',email:'balaji@gmail.com',address:'London'};
  return (
    <SafeAreaView>
      <View style={styles.page}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Hello  {user.name}
          {/* {route.params.name} */}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Listing');
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Go to Listing
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
          alignSelf: 'center',
          
        }}>
        <Text style={[styles.section]}>Mobile & Email</Text>

        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={require('../../assets/phone.jpeg')}
          />
          <Text>{user.phone}</Text>
          {/* <Text style={[styles.section,{fontSize:15}]}>{route.params.phone}</Text> */}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={require('../../assets/email.png')}
          />
          <Text>{user.email}</Text>
          {/* <Text style={[styles.section,{fontSize:15}]}>{route.params.email}</Text> */}
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Text style={[styles.section]}>Pick up Details</Text>

        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={require('../../assets/home.png')}
          />
          {/* <Text style={[styles.section,{fontSize:15}]}>{route.params.address}</Text> */}
        </View>
      </View>

      <View style={[styles.sectionView, {height: 400}]}>
        <Text style={styles.section}>Top Products sold</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={[
                styles.sectionView,
                {height: 60, backgroundColor: '#DADADA',},
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    fontSize: 12,
    borderColor: 'blue',
    width: 120,
    height: 30,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderRadius: 60,
    
    marginRight: 20,
  },
  section: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  image: {
    maxHeight: 30,
    maxWidth: 30,
    alignSelf: 'center',
   
  },
  sectionView: {
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginLeft: 10,
    marginRight: 20,
   justifyContent:'center'
  },
});

export default Retailers;
