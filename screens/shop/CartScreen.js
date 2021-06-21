import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productImageUrl1: state.cart.items[key].productImageUrl1,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Bill Amount :{' '}
          <Text style={styles.amount}>₹{cartTotalAmount}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small"/>
        ) : (
          <Button
            title="Buy Now"
            color={Colors.primaryColor}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            imageUrl1={itemData.item.productImageUrl1}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {              
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Cart',
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
  }
};

const styles = StyleSheet.create({
  screen: {
    margin: 10
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10
  },
  amount: {
    
  }
});

export default CartScreen;
