import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const IndiaScreen = props => {
    return (
        <View style={styles.container}>
            <Text>made in India</Text>
            <Card>
                <Card.Title
                    title='Made in India'
                />
            </Card>
            <Card>
                <Card.Cover style={styles.image} source={require('../../assets/images/img1.jpg')} />
            </Card>
            <Card style={styles.image}>
                
            </Card>
        </View>
    )
};
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    image: {    
        width: '100%',
        resizeMode: 'contain',
    }
});

export default IndiaScreen;