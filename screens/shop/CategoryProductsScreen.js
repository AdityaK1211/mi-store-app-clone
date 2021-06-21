import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList,  Image, Button, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { List, Title } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { CATEGORIES } from '../../data/dummy-data';
import HeaderButton from '../../components/UI/HeaderButton';
import DefaultText from '../../components/UI/DefaultText';
import ProductItem from '../../components/shop/ProductItem';
import CategoryGridTile from '../../components/UI/CategoryGridTile';

import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

const CategoryProductsScreen = props => {
  const catId = props.navigation.getParam('categoryIds');
  const availableProducts = useSelector(state => state.products.availableProducts);
  const displayedProducts = availableProducts.filter(
      product => product.categoryIds.indexOf(catId) >= 0
  );

  if (displayedProducts.length === 0) {
      return (
        <View style={styles.content}>
          <DefaultText>No products found!</DefaultText>
        </View>
      );
  }  
  const dispatch = useDispatch();

  
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  
  return (
    <FlatList
    data={displayedProducts}
    keyExtractor={item => item.id}
    
    renderItem={itemData => (
      <ProductItem
        image={itemData.item.imageUrl1}
        category={itemData.item.categoryIds}
        title={itemData.item.title}
        price={itemData.item.price}
        oldPrice={itemData.item.oldPrice}
        description={itemData.item.description}

        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      >          
        <Button
          title="View Details"
          color={Colors.primaryColor}
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          title="To Cart"
          color={Colors.primaryColor}
          onPress={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
    )}
  />
  )
}

CategoryProductsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryIds');
  
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  
    return {
      headerTitle: selectedCategory.title
    };
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});
  
export default CategoryProductsScreen;
  