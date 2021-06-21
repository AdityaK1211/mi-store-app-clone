import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Avatar, Card } from 'react-native-paper';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import * as authActions from '../../store/actions/auth';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  return (
        <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl1}
            category={itemData.item.categoryIds}
            title={itemData.item.title}
            price={itemData.item.price}
            oldPrice={itemData.item.oldPrice}
            description={itemData.item.description}
            rating={itemData.item.rating}
            overview={itemData.item.overview}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <Button
              title="Edit"
              color={Colors.primaryColor}
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button
              title="Delete"
              color={Colors.primaryColor}
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ProductItem>
        )}
      />
   
  );
};

UserProductsScreen.navigationOptions = navData => {
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

export default UserProductsScreen;
