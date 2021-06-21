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

import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth';

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

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      displayName: '',
      phoneNumber: '',
    },
    inputValidities: {
      email: false,
      password: false,
      displayName: false,
      phoneNumber: false,
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.displayName,
        formState.inputValues.phoneNumber,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
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
      style={styles.screen}
    >
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <Card.Title 
            title="MI Store App"
            subtitle="Clone"
            left={ () => <Image 
              source={require('../../assets/icons/mi_logo.png')} 
              style={{ width: 40, resizeMode: 'contain' }} 
            /> 
          }
          />
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              placeholder="Enter email address"
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              placeholder="Enter password"
            />
            {isSignup ? (
                <View>
                  <Input
                    id="displayName"
                    label="Name"
                    keyboardType="default"
                    required
                    errorText="Please enter a valid name."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    placeholder="Enter username"
                  />
                  <Input
                    id="phoneNumber"
                    label="Phone Number"
                    keyboardType="phone-pad"
                    required
                    autoCapitalize="none"
                    errorText="Please enter a valid phone number."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    placeholder="Enter phone number"
                  />
                </View>
              ) : (
                <View></View>
              )}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Button
                  color={Colors.primaryColor}
                  title={isSignup ? 'Sign up' : 'Login'}
                  onPress={authHandler}
                  style={{ borderRadius: 10, }}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                style={{ borderRadius: 50, }}
                color={Colors.primaryColor}
                title={`${isSignup ? 'Login' : 'Sign Up'}`}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
            <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center',}}>
              <Text
                  style={{ color: Colors.secondaryTextColor, fontWeight: 'bold', fontSize: 14 }}
                  onPress={() => {
                    props.navigation.navigate('PhoneAuth')
                  }}
              >Login with Phone Number</Text>
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
              size={20}
              color='#DB4437'
              onPress={() => {
                console.log('Github')
              }}
            />
            <Icon
              name="logo-facebook"
              size={20}
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

AuthScreen.navigationOptions = {
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

export default AuthScreen;
