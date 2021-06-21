import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import ShopNavigator from './ShopNavigator';

const AppNavigator = props => {
  return (
    <NavigationContainer>
      <ShopNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;