import {StyleSheet, Text, View, Image} from 'react-native';
import React, { useRef } from 'react';
import {TabRouter} from '@react-navigation/native';

const Product = ({navigation,route}) => {

  return (
    <View style={styles.header}>

      <View style={styles.image}>
        <Image
          source={
            {uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}
        //uri: '{route.params.url}'
    }
        />
      </View>

      <View >
            <Text style={styles.text}>Product Details</Text>
            <Text style={styles.text1}>Name: 
                {/* {route.params.name} */}
            </Text>
            <Text style={styles.text1}>Description: 
            {/* {route.params.description} */}
            </Text>
            <Text style={styles.text1}>Price: 
            {/* {route.params.price} */}
            </Text>
            <Text style={styles.text1}>Rating: 
            {/* {route.params.rating} */}
            </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'stretch',flexDirection:'column',marginTop:150,left:50,justifyContent:'space-evenly'
  },
  image: {
    height: 250,
    width: 250,
    // backgroundColor:"black",
    // resizeMode: 'contain',
  },
  text: { color: 'black', fontWeight: 'bold', fontSize: 20},
  text1: {color: 'black', fontSize: 15},
});
export default Product;
