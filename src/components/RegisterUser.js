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

import {ProjectColors} from './colors/ProjectColors';

const RegisterUser = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [seePassword, setSeePassword] = useState(true);
  const [signInMode, setSignInMode] = useState(true);

  // user states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

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
    //signUpUser();
    //loginUser();
    //notifyMessage(`${email} ${password}`);
    if (signInMode) {
      //sign up
      //signUpUser();
    } else {
      // login
      if (emailValidError === '' && password.length >= 8) {
        // verify user
        //loginUser();
      }
    }
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
                label="Email"
                style={styles.textInputEmail}
                placeholder="Enter Your Name"
                placeholderTextColor={ProjectColors.grey}
                onChangeText={text => {
                  //validateEmailRunTime(text);
                }}
              />
            )}
            <TextInput
              label="Email"
              style={styles.textInputEmail}
              placeholder="Your Email id"
              placeholderTextColor={ProjectColors.grey}
              onChangeText={text => {
                //validateEmailRunTime(text);
              }}
            />
            <View style={styles.passwordView}>
              <TextInput
                label="Passwordd"
                secureTextEntry={seePassword}
                placeholder="Password"
                placeholderTextColor={ProjectColors.grey}
                style={styles.textInputPassword}
                onChangeText={text => {
                  //setPassword(text);
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
                  label="Confirm Passwordd"
                  secureTextEntry={seePassword}
                  placeholder="Confirm Password"
                  placeholderTextColor={ProjectColors.grey}
                  style={styles.textInputPassword}
                  onChangeText={text => {
                    //setPassword(text);
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
            )}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                //handleSignUpLoginButtonClick();
              }}>
              <Text style={styles.buttonText}>
                {signInMode ? 'Sign-Up' : 'Log-In'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.dontHaveAccountText}>
              {signInMode
                ? 'Already Have an Account? '
                : "Don't Have an Account?"}
              <TouchableOpacity
                onPress={() => {
                  setSignInMode(!signInMode);
                }}>
                <Text style={styles.signupText}>
                  {signInMode ? ' Log In' : ' Sign Up'}
                </Text>
              </TouchableOpacity>
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
    height: 510,
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
});
