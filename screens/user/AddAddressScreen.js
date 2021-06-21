import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {AntDesign, MaterialIcons, Ionicons, Entypo} from "@expo/vector-icons";
import * as Location from 'expo-location';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as addressActions from '../../store/actions/address'

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

const AddAddressScreen = props => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      alias: '',
      type: '',
      landmark: '',
      location: '',
      city: '',
      country: '',
      zipcode: '',
      latitude: '',
      longitude: '',
    },
    inputValidities: {
      alias: false,
      type: false,
      landmark: false,
      location: false,
      city: false,
      country: false,
      zipcode: false,
      latitude: false,
      longitude: false,
    },
    formIsValid: false
  });

  // Submit Handler
  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      dispatch(
        productsActions.addAddress(
          formState.inputValues.alias, 
          formState.inputValues.type, 
          formState.inputValues.landmark, 
          formState.inputValues.location, 
          formState.inputValues.city, 
          formState.inputValues.country, 
          formState.inputValues.zipcode, 
          formState.inputValues.latitude, 
          formState.inputValues.longitude 
        )
      );
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    
  }, [dispatch, formState]);

  // Change Handler
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
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl1"
            label="Image Url 1"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl1 : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl2"
            label="Image Url 2"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl2 : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl3"
            label="Image Url 3"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl3 : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl4"
            label="Image Url 4"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl4 : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0}
            />
          )}
          {editedProduct ? null : (
            <Input
              id="oldPrice"
              label="Old Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          <Input
            id="rating"
            label="Rating"
            errorText="Please enter a valid rating!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.rating : ''}
            initiallyValid={!!editedProduct}
            required
            min={1}
          />
          <Input
            id="overview"
            label="Overview"
            errorText="Please enter a valid overview!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.overview : ''}
            initiallyValid={!!editedProduct}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

AddAddressScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Address',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddAddressScreen;