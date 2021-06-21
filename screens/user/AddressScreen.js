import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {AntDesign, MaterialIcons, Ionicons, Entypo} from "@expo/vector-icons";

import * as Location from 'expo-location';
import axios from "axios";

const AddressScreen = props => {
  return (
    <View style={styles.container}>
      <Text>AddressScreen</Text>
    </View>
  )
}

AddressScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Address',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddressScreen;