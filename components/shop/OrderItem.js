import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>

      <View style={styles.summary}>
        <Text style={styles.totalAmount}>Total Amount: ₹{props.amount}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primaryColor}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              imageUrl1={cartItem.productImageUrl1}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontSize: 16
  },
  date: {
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});


export default OrderItem;
