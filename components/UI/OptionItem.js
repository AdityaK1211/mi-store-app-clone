import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OptionItem = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: props.color, borderRadius: 10 }}>
            <Icon 
                name={props.icon}
                size={20}
            />
        </View>
        <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default OptionItem;
