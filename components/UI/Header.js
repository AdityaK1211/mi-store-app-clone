import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = props => {
    return (
        <Appbar.Header>
            <Appbar.Action icon="magnify" />
            <Appbar.Content title="MI App Store" subtitle="Clone" />
            <Appbar.Action icon="message-text-outline" />
            <Appbar.Action icon="cart-outline" />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({

})

export default Header;
