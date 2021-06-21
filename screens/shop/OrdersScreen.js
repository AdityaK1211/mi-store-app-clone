import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Search"
          iconName="search-outline"
          onPress={() => {
            
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Login"
          iconName='chatbox-ellipses-outline'
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}
        />
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'cart-outline' : 'ios-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
  

export default OrdersScreen;