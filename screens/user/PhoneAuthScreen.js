import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Checkbox, Paragraph, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from "firebase";

import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';

try {
  if(firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: "AIzaSyAccUzXFqsg9pzNQNzxxJaop_0q37WjggU",
      authDomain: "mi-store-app-clone-dev.firebaseapp.com",
      databaseURL: "https://mi-store-app-clone-dev-default-rtdb.firebaseio.com",
      projectId: "mi-store-app-clone-dev",
      storageBucket: "mi-store-app-clone-dev.appspot.com",
      messagingSenderId: "166699803706",
      appId: "1:166699803706:web:3219274105505093580103",
    });
  } else {
    console.log('App Already Exist in Firebase');
  }
} catch (err) {
  console.log('initialise', err);
}

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const PhoneAuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [checked, setChecked] = useState(false);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const recaptchaVerifier = useRef(null);

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        '+91' + phoneNumber,
        recaptchaVerifier.current
      );
      Alert.alert('Verification code has been sent to your phone.');
      setIsLoading(false);
      navigation.navigate('Otp', {
        phoneNumber: phoneNumber,
        verificationId: verificationId,
      });
    } catch (err) {
      Alert.alert('Unable to Send OTP');
      console.log(err);
      setIsLoading(false);
    }
  };

  const getButton = () => {
    if(isLoading) {
      return (
        <View style={styles.disabledLoginButton}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      );
    } else if(phoneNumber.length === 10) {
      return (
        <TouchableOpacity onPress={sendOtp}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>SEND OTP</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.disabledLoginButton}>
        <Text style={styles.loginButtonText}>ENTER PHONE NUMBER</Text>
      </View>
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.phone,
        formState.inputValues.otp
      );
    } else {
      action = authActions.login(
        formState.inputValues.phone,
        formState.inputValues.otp
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <Card.Title 
            title="MI Store App"
            subtitle="Clone"
            left={ (props) => <Image 
              source={require('../../assets/icons/mi_logo.png')} 
              style={{ width: 40, resizeMode: 'contain' }} 
            /> 
          }
          />
          <ScrollView>
            <Input
              id="phone"
              label="Phone Number"
              keyboardType="phone-pad"
              required
              phone
              autoCapitalize="none"
              errorText="Please enter a valid phone number."
              onInputChange={inputChangeHandler}
              initialValue=""
              placeholder="Enter phone number"
            />
            <View style={styles.buttonContainer}>
              <Button
                color={Colors.primaryColor}
                title='Generate OTP'
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
            {isSignup ? (
              <View>
                <Input
                  id="otp"
                  label="Verify OTP (One Time Password)"
                  keyboardType="number-pad"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid OTP."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  placeholder="Enter OTP recieved on phone"
                />
                <View style={styles.buttonContainer}>
                  {isLoading ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <Button
                      color={Colors.primaryColor}
                      title='Confirm Verification Code'
                      onPress={authHandler}
                    />
                  )}
                </View>
              </View> 
              ) : (
                <View></View>
              )
            }
            <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center',}}>
              <Text
                  style={{ color: Colors.secondaryTextColor, fontWeight: 'bold', fontSize: 14 }}
                  onPress={() => {
                    props.navigation.navigate('Auth')
                  }}
              >Login with Email Address</Text>
            </View>
          </ScrollView>
        </Card>
        <Card style={styles.subAuthContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ color: Colors.secondaryTextColor, paddingBottom: 3 }}> 
              I've read and agreed to the Privacy Policy
            </Text>
          </View>
    
          <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between', paddingHorizontal: 60 }}>
            <Paragraph>More Options</Paragraph>
            <Icon
              name="logo-google"
              size={30}
              color='#DB4437'
              onPress={() => {
                console.log('Github')
              }}
            />
            <Icon
              name="logo-facebook"
              size={30}
              color='#4267B2'
              onPress={() => {
                console.log('Github')
              }}
            />
          </View>
        </Card>
        <View style={styles.copyright}>    
          <Text style={{ fontSize: 16, color: Colors.secondaryTextColor }}>Copyright {'\u00A9'} 2021. All Rights Reserved</Text>
          <Text style={{ fontSize: 14, color: Colors.secondaryTextColor }}>🚀 Developed in India</Text>
        </View>
      </View>
      
    </KeyboardAvoidingView>
  );
};

PhoneAuthScreen.navigationOptions = {
  headerTitle: 'MI Account',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Help"
        iconName='help-circle-outline'
        onPress={() => {
          Alert.alert(
            'Help', 
            'Login/Sign up with your details and credentials.', 
            [{ text: 'Okay' }]);
        }}
      />
    </HeaderButtons>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 550,
    padding: 20,
    marginTop: 20
  },
  subAuthContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: 10,
  },
  copyright: {    
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhoneAuthScreen;
