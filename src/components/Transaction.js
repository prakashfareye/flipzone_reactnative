import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    AlertIOS,
    DrawerLayoutAndroid,
    Image,
    FlatList, Button,
    KeyboardAvoidingView
} from 'react-native';

import {ProjectColors} from './colors/ProjectColors';

const Transaction = ({route, navigation}) => {

    const [cardNumber, setCardNumber] = useState();
    const [expirydate, setExpiryDate] = useState();
    const [cvv, setCvv] = useState();
    const [pincode, setPincode] = useState();
    const [address, setAddress] = useState();

    const handleSubmit = () => {
        console.log("Submitting");
    }

    const handleCancel = () => {
        console.log("cancel");
        navigation.goBack()
    }
    

    return (
        <KeyboardAvoidingView style={{backgroundColor: ProjectColors.white, flex: 1, justifyContent: 'center'}} behavior="height">
            <View style={styles.viewBox}>
                <Text style={{padding: 20, fontWeight: 'bold'}}>Address</Text>
                <TextInput
                label="address"
                style={styles.textInputEmail}
                placeholder="Address"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setAddress(text);
                }}
                multiline
                numberOfLines={3}
                />
                <TextInput
                label="pincode"
                style={styles.textInputEmail}
                placeholder="Pincode"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setPincode(text);
                }}
                maxLength={6}
                keyboardType='numeric'
                />
            </View>
            <View style={{flex: 1}}>
            <ScrollView>
                <Text style={{padding: 20, fontWeight: 'bold'}}>Card Details</Text>
                <TextInput
                label="cardNumber"
                style={styles.textInputEmail}
                placeholder="Card Number"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setCardNumber(text);
                }}
                keyboardType='numeric'
                maxLength={12}
                />
                <TextInput
                label="expiry"
                style={styles.textInputEmail}
                placeholder="Expiry Date"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setExpiryDate(text);
                }}
                keyboardType='numeric'
                />
                <TextInput
                label="cvv"
                style={styles.textInputEmail}
                placeholder="CVV"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setCvv(text);
                }}
                keyboardType='numeric'
                maxLength={3}
                />
                </ScrollView>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 15,}}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={[styles.button, {backgroundColor: ProjectColors.navy}]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 100,
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        alignSelf: "center"
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputEmail: {
        padding: 10,
        marginTop: 10,
        marginLeft: 20,
        marginEnd: 20,
        borderWidth: 1,
        borderColor: ProjectColors.grey,
        underlineColor: ProjectColors.black,
        borderRadius: 10,
        activeUnderlineColor: ProjectColors.black,
    },
})

export default Transaction;