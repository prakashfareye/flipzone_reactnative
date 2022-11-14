import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
  {id: '1', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '2', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '3', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '6', name: 'kitkat', description: 'good one', price: '10'},
  {id: '4', name: 'dairymilk', description: 'good one', price: '10'},
  {id: '5', name: 'dairymilk', description: 'good one', price: '10'},
];

const Retailers = ({route, navigation}) => {
  const user = {userId: 1, userName: 'Balaji', userEmailId: 'balaji@gmail.com'};
  // const user={route.params.user}
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Hello {user.userName}
          {/* {route.params.name} */}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              await AsyncStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
              console.log('error', error);
            }

            // let data=  await fetch(
            //     `http://localhost:8085/product/u/userId`,
            //     {
            //       method: 'POST',
            //     },
            //   )
            //     .then(res => {
            //       //  console.log(res,'dfghjkiuhygtfrdrftgyhujik');
            //       console.log(res.status);
            //       if (res.status === 200) {
            //         navigation.navigate('Listing', {post:data });
            //       }
            //     })
            //     .catch(e => console.log(e));
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Go to Listing
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', marginTop: '10'}}>
        <Image
          style={styles.image}
          source={require('../../assets/email.png')}
        />
        <Text style={styles.text}>{user.userEmailId}</Text>
        {/* <Text style={[styles.section,{fontSize:15}]}>{route.params.email}</Text> */}
      </View>
      {/* </View> */}

      {/* <View style={{marginTop: 20}}>
        <Text style={[styles.section]}>Pick up Details</Text>

        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={require('../../assets/home.png')}
          />
          <Text style={styles.text}>{user.address}</Text>
          
        {/* </View>
      </View> */}
      <Text style={[styles.section, {fontSize: 15}]}>
        See some of your top sold products -
      </Text>

      <View style={[styles.sectionView, {height: 400}]}>
        {/* <Text style={[styles.section,{marginTop:25}]}>Top Products sold</Text> */}

        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={[
                styles.sectionView,
                {height: 60, backgroundColor: 'white'},
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
  text: {alignSelf: 'center'},
  button: {
    fontSize: 12,
    borderColor: 'blue',
    width: 120,
    height: 30,
    backgroundColor: '#2874F0',
    borderWidth: 2,
    marginRight: 20,
  },
  section: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
  },
  image: {
    maxHeight: 30,
    maxWidth: 30,
    alignSelf: 'center',
  },
  sectionView: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#2874F0',
    paddingHorizontal: 20,
    marginLeft: 10,
    marginRight: 20,
    justifyContent: 'center',
  },
});

export default Retailers;
