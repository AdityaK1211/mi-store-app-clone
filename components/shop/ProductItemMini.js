import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Card } from 'react-native-paper';

const ProductItemMini = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>₹{props.price} <Text style={{ color: '#AEB6BF', fontSize: 12, textDecorationLine: 'line-through'}}>₹{props.oldPrice}</Text></Text>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height: 150,
        margin: 2,
        paddingVertical: 5
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 4
      },
    title: {
        fontSize: 16,
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        color: '#E74C3C'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 10
    }
})

export default ProductItemMini;