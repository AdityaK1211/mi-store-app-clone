import React from 'react';
import { StyleSheet, View, Text, FlatList, Button, Platform, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Avatar, Card, List, Subheading } from 'react-native-paper';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import OptionItem from '../../components/UI/OptionItem';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import * as authActions from '../../store/actions/auth';

const UserAccountScreen = props => {
  const dispatch = useDispatch(); 

  return (
    <ScrollView>
      <View>
        <Card>
            <View>
            <Card.Title
                title='Welcome'
            />
            </View>
        </Card>
        <View style={{ margin: 20 }}>
        <Card style={{ marginVertical: 10 }}>
                <Card.Content>
                    <Subheading style={{ marginBottom: 10 }}>Manage Address</Subheading>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 2 }}>
                        <OptionItem
                            icon='home-outline'
                            color='#D6EAF8'
                            label='Address'
                            onPress={() => {
                                props.navigation.navigate('UserAddress')
                            }}
                        />
                        <OptionItem
                            icon='add-outline'
                            color='#D4EFDF'
                            label='Add'
                            onPress={() => {
                                props.navigation.navigate('AddAddress')
                            }}
                        />
                        <OptionItem
                            icon='pencil-outline'
                            color='#FADBD8'
                            label='Edit'
                            onPress={() => {
                                props.navigation.navigate('AddAddress')
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10 }}>
                <Card.Content>
                    <Subheading style={{ marginBottom: 10 }}>Orders</Subheading>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 2 }}>
                        <OptionItem
                            icon='pricetags-outline'
                            color='#D6EAF8'
                            label='My Orders'
                            onPress={() => {
                                props.navigation.navigate('UserOrders')
                            }}
                        />
                        <OptionItem
                            icon='cart-outline'
                            color='#D4EFDF'
                            label='My Cart'
                            onPress={() => {
                                props.navigation.navigate('UserCart')
                            }}
                        />
                        <OptionItem
                            icon='add-circle-outline'
                            color='#FADBD8'
                            label='My Products'
                            onPress={() => {
                                props.navigation.navigate('UserProducts')
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10 }}>
                <Card.Content>
                    <Subheading style={{ marginBottom: 10 }}>Support</Subheading>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 2 }}>
                        <OptionItem
                            icon='shield-checkmark-outline'
                            color='#D6EAF8'
                            label='Protection'
                            onPress={() => {
                                props.navigation.navigate('UserOrders')
                            }}
                        />
                        <OptionItem
                            icon='gift-outline'
                            color='#D4EFDF'
                            label='Gift Cards'
                            onPress={() => {
                                props.navigation.navigate('UserCart')
                            }}
                        />
                        <OptionItem
                            icon='ice-cream-outline'
                            color='#FADBD8'
                            label='Coupons'
                            onPress={() => {
                            
                            }}
                        />
                        <OptionItem
                            icon='card-outline'
                            color='#E8DAEF'
                            label='Smart Card'
                            onPress={() => {
                            
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 50, marginTop: 15}}>
                        <OptionItem
                            icon='chatbubbles-outline'
                            color='#FCF3CF'
                            label='Chat'
                            onPress={() => {
                                props.navigation.navigate('UserOrders')
                            }}
                        />
                        <OptionItem
                            icon='trophy-outline'
                            color='#E5E8E8'
                            label='Rewards'
                            onPress={() => {
                                props.navigation.navigate('UserCart')
                            }}
                        />
                        <OptionItem
                            icon='mail-outline'
                            color='#D1F2EB'
                            label='E-mail'
                            onPress={() => {
                            
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10 }}>    
                <List.Item style={{ marginVertical: -10 }} title="Message" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Notifications" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Online Help" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Mi Store Franchise Application Form" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Mi Home" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="F-codes" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Address Manager" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Mi TV Warranty" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Mi TV Installation Service" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Mi Authorized Stores" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Service Centers" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Customer Care" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Settings" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginVertical: -10 }} title="Terms of Use" right={() => <List.Icon icon="chevron-right" />} />
                <List.Item style={{ marginTop: -15 }} 
                    title="Logout" 
                    right={() => <List.Icon icon="chevron-right"/>}
                    onPress={() => {
                        dispatch(authActions.logout)
                        props.navigation.navigate('Auth')
                    }}
                />
            </Card>
        </View>
      </View>
      <View style={styles.copyright}>    
          <Text style={{ fontSize: 16, color: Colors.secondaryTextColor }}>Copyright {'\u00A9'} 2021. All Rights Reserved</Text>
          <Text style={{ fontSize: 14, color: Colors.secondaryTextColor }}>🚀 Developed in India</Text>
        </View>
    </ScrollView>
    
  );
};

UserAccountScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Account',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Search"
          iconName="search-outline"
          onPress={() => {
            console.log('Search')
          }}
        />
      </HeaderButtons>
    ),   
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
    copyright: {    
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default UserAccountScreen;
