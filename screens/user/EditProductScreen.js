import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Switch,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  TouchableOpacity
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';

import * as productsActions from '../../store/actions/products';

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedValue, setSelectedValue] = useState(editedProduct ? editedProduct.categoryIds : 'c1');
  const [shouldShow, setShouldShow] = useState(false);  

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      categoryIds: editedProduct ? editedProduct.categoryIds : '',
      title: editedProduct ? editedProduct.title : '',
      imageUrl1: editedProduct ? editedProduct.imageUrl1 : '',
      imageUrl2: editedProduct ? editedProduct.imageUrl2 : '',
      imageUrl3: editedProduct ? editedProduct.imageUrl3 : '',
      imageUrl4: editedProduct ? editedProduct.imageUrl4 : '',
      price: '',
      oldPrice: '',
      description: editedProduct ? editedProduct.description : '',
      rating: editedProduct ? editedProduct.rating : '',
      overview: editedProduct ? editedProduct.overview : '',
    },
    inputValidities: {
      categoryIds: editedProduct ? true : false,
      title: editedProduct ? true : false,
      imageUrl1: editedProduct ? true : false,
      imageUrl2: editedProduct ? true : false,
      imageUrl3: editedProduct ? true : false,
      imageUrl4: editedProduct ? true : false,
      price: editedProduct ? true : false,
      oldPrice: editedProduct ? true : false,
      description: editedProduct ? true : false,
      rating: editedProduct ? true : false,
      overview: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

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
      if (editedProduct) {
        dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.categoryIds,
            formState.inputValues.title,
            formState.inputValues.imageUrl1,
            formState.inputValues.imageUrl2,
            formState.inputValues.imageUrl3,
            formState.inputValues.imageUrl4,
            formState.inputValues.description,
            formState.inputValues.rating,
            formState.inputValues.overview
          )
        );
      } else {
        dispatch(
          productsActions.createProduct(
            formState.inputValues.categoryIds,
            formState.inputValues.title,
            formState.inputValues.imageUrl1,
            formState.inputValues.imageUrl2,
            formState.inputValues.imageUrl3,
            formState.inputValues.imageUrl4,
            +formState.inputValues.price,
            +formState.inputValues.oldPrice,
            formState.inputValues.description,
            formState.inputValues.rating,
            formState.inputValues.overview
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Picker
            selectedValue={editedProduct ? editedProduct.categoryIds : 'c1'}
            style={{ height: 80, width: '80%' }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue)
            }}
          >
            <Picker.Item label="SmartPhone" value="c1" />
            <Picker.Item label="TVs Streaming Device" value="c2" />
            <Picker.Item label="Laptops" value="c3" />
            <Picker.Item label="Power Banks" value="c4" />
            <Picker.Item label="Smart Wearables" value="c5" />
            <Picker.Item label="Audio" value="c6" />
            <Picker.Item label="Home" value="c7" />
            <Picker.Item label="Lifestyle" value="c8" />
            <Picker.Item label="Luggage Backpacks" value="c9" />
            <Picker.Item label="Chargers Cables" value="c10" />
            <Picker.Item label="Cases Protectors" value="c11" />
            <Picker.Item label="Combos" value="c12" />
          </Picker>
          <Input 
            id="categoryIds"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.categoryIds : selectedValue}
            value={editedProduct ? editedProduct.categoryIds : selectedValue}
            editable={false}
          />
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
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
