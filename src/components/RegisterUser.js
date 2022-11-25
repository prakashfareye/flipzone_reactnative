import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RadioButton} from 'react-native-paper';

import { IP } from './AndroidIP'

import {ProjectColors} from './colors/ProjectColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'User', value: 'ROLE_USER'},
  {label: 'Retailer', value: 'ROLE_RETAILER'},
];

const RegisterUser = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [seePassword, setSeePassword] = useState(true);
  const [seeCP,setSeeCP]=useState(true);
  const [signInMode, setSignInMode] = useState(true);

  // user states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [checked, setChecked] = React.useState('ROLE_USER');

  //role
  const [role, setRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    getUserDetailFromAsyncSrorage();
  });

  const getUserDetailFromAsyncSrorage = () => {
    AsyncStorage.getItem('user').then(res => {
      res = JSON.parse(res);
      if (res !== null) {
        if (res.role == 'ROLE_USER') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('My Listing');
        }
      }
    });
  };

  const validateEmailRunTime = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValidError('');
    if (reg.test(text) === false) {
      setEmailValidError('Email is Not Correct');
     
    } else if (reg.test(text) === true) {
      setEmailValidError('');
      setEmail(text);
    }
  };

  const handleSignUpLoginButtonClick = () => {
    if (signInMode) {
      //sign up
      
      if (emailValidError === '' && password.length >= 8 && confirmPassword==password) {
      signUpUser();}
      else{alert("Invalid Credentials");}
    } else {
      // login
      if (emailValidError === '' && password.length >= 8 && confirmPassword==password) {
        // verify user
        loginUser();
      }
      else{alert("Invalid Credentials");}
    }
  };

  const saveUserToAsyncStorage = user => {
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(json => console.log('User Detail Saving success!'))
      .catch(error => console.log('User Detail Saving error!', error));
  };

  const loginUser = () => {
    console.log(email, password);
    fetch(`http://${IP}:8085/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${email}&password=${password}`,
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        saveUserToAsyncStorage(res);
        if (res.role == 'ROLE_USER') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('My Listing');
        }
      })
      .catch(error => console.log('fetchToken error: ', error));
  };

  const signUpUser = () => {
    console.log(
      'Inside signup',
      JSON.stringify({
        userName: name,
        userEmailId: email,
        password: password,
        role: role,
      }),
    );

    fetch(`http://${IP}:8085/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: name,
        userEmailId: email,
        password: password,
        role: role,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        saveUserToAsyncStorage(res);
        if (res.role === 'ROLE_USER') {
          console.log('Checking Role', res.role);
          navigation.navigate('Home');
        } else {
          navigation.navigate('My Listing');
        }
      })
      .catch(error => console.log('fetchToken error: ', error));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={signInMode ? styles.cardSignUp : styles.cardLogin}>
            <Text style={styles.headerTitle}>Welcome to FlipZone</Text>
            <Text style={styles.headerSubTitle}>{`Please ${
              signInMode ? ' Sign Up' : ' Log In'
            } To Continue`}</Text>
            {signInMode && (
              <TextInput
                label="Name"
                style={styles.textInputEmail}
                placeholder="Enter Your Name"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  setName(text);
                }}
              />
            )}
            <TextInput
              label="Email"
              style={styles.textInputEmail}
              placeholder="Your Email id"
              placeholderTextColor={ProjectColors.grey}
              onChangeText={text => {
                validateEmailRunTime(text);
              }}
            />
            <View style={styles.passwordView}>
              <TextInput
                label="Password"
                secureTextEntry={seePassword}
                placeholder="Password"
                value={password}
                placeholderTextColor={ProjectColors.grey}
                style={styles.textInputPassword}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeePassword(!seePassword)}>
                <Image
                  source={
                    seePassword
                      ? require('../assets/open.png')
                      : require('../assets/closed.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {signInMode && (
              <View style={styles.passwordView}>
                <TextInput
                  label="Confirm Password"
                  secureTextEntry={seeCP}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor={ProjectColors.grey}
                  style={styles.textInputPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.wrapperIcon}
                  onPress={() => setSeeCP(!seeCP)}>
                  <Image
                    source={
                      seePassword
                        ? require('../assets/open.png')
                        : require('../assets/closed.png')
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
            {signInMode && (
              <View style={styles.dropdownContainer}>
                {/*renderLabel() */}
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Role' : '...'}
                  searchPlaceholder="Search..."
                  value={role}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setRole(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                handleSignUpLoginButtonClick();
              }}>
              <Text style={styles.buttonText}>
                {signInMode ? 'Sign-Up' : 'Log-In'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.dontHaveAccountText}>
              {signInMode
                ? 'Already Have an Account? '
                : "Don't Have an Account?"}
              <Text
                onPress={() => {
                  setSignInMode(!signInMode);
                }}>
                <Text style={styles.signupText}>
                  {signInMode ? ' Log In' : ' Sign Up'}
                </Text>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: ProjectColors.mint,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 20,
  },
  cardLogin: {
    width: 350,
    height: 390,
    elevation: 3,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: ProjectColors.white,
  },
  cardSignUp: {
    width: 350,
    height: 610,
    elevation: 3,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: ProjectColors.white,
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 21,
    color: ProjectColors.black,
    marginTop: 30,
  },
  headerSubTitle: {
    textAlign: 'center',
    fontSize: 13,
    color: ProjectColors.black,
    marginTop: 10,
    marginBottom: 15,
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
  textInputPassword: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: ProjectColors.grey,
    underlineColor: ProjectColors.black,
    borderRadius: 10,
    activeUnderlineColor: ProjectColors.black,
    paddingEnd: 25,
  },
  passwordView: {
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: 10,
    marginEnd: 20,
  },
  icon: {
    width: 25,
    height: 20,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: ProjectColors.white,
    borderRadius: 10,
    backgroundColor: ProjectColors.navy,
    marginLeft: 40,
    marginEnd: 40,
    marginTop: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  dontHaveAccountText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: '#000',
    marginTop: 10,
    padding: 10,
  },
  signupText: {
    fontSize: 15,
    color: ProjectColors.navy,
    fontWeight: 'bold',
  },
  radioContainer: {
    display: 'flex',
    direction: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  radioButtonItem: {
    width: 100,
  },
  buttonRow: {
    display: 'flex',
    direction: 'row',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  dropdown: {
    height: 50,
    borderColor: ProjectColors.grey,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
