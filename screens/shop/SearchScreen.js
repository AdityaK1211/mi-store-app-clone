import {Text, SafeAreaView, Keyboard, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const SearchScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholder="Search for products"
            placeholderTextColor='gray'
            selectionColor={Colors.primaryColor}
          />
          <Entypo name="cross" size={30} color="gray" onPress={() => Keyboard.dismiss()}/>
        </View>
      </View>
      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentSearchText}>
          Recent Searches
        </Text>
        <TouchableOpacity>
          <Text style={styles.showMoreText}>
            SHOW MORE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: 30,
    },
    mainContainer: {
      width: '100%',
      height: 20,
      paddingHorizontal: 5,
      marginBottom: 10
    },
    searchContainer: {
      borderColor: 'gray',
      borderWidth: 0.05,
      height: '100%',
      borderRadius: 0.5,
      paddingLeft: 3,
      paddingRight: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      height: '100%',
      width: '80%',
      fontSize: 18,
    },
    recentSearchContainer: {
      marginTop: 1,
      width: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recentSearchText: {
      fontSize: 17,
    },
    showMoreText: {
      fontSize: 13,
      color: Colors.primaryColor,
    },
})

export default SearchScreen;