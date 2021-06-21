import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, Image, Button, ActivityIndicator, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Drawer, List, Title } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { CATEGORIES } from '../../data/dummy-data';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItemMini from '../../components/shop/ProductItemMini';
import CategoryGridTile from '../../components/UI/CategoryGridTile';

import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

const CategoriesScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [active, setActive] = useState('');

  const productSmartPhone = useSelector(state => state.products.availableProducts);
  
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (!isLoading && productSmartPhone.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
      <View style={styles.container}>
          <View style={{ backgroundColor: '#F4F6F6', height: '100%', width: '35%'}}>
          <List.Section style={{ flex: 1, flexDirection: 'column'}}>
              <List.Subheader>Catgories</List.Subheader>
              <List.Item
                  title="Smartphones"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c1'
                      }
                    })
                  }}
              />
              <List.Item
                  title="TVs"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c2'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Laptops"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c3'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Power Banks"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c4'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Wearables"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c5'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Audio"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c6'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Home"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c7'
                      }
                    })
                  }}
              />
              <List.Item
                  title="Lifestyle"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: 'CategoryProducts',
                      params: {
                        categoryIds: 'c8'
                      }
                    })
                  }}
              />
          </List.Section>
          </View>
          <View style={{ backgroundColor: '#FFF', height: '100%', width: '65%', alignItems: 'center', justifyContet: 'flex-start', marginTop: 20 }}>
              <Title>Smartphones</Title>
              <FlatList
                  data={productSmartPhone}
                  keyExtractor={(item, index) => item.id}
                  numColumns={2}

                  renderItem={itemData => (
                    <ProductItemMini
                      image={itemData.item.imageUrl}
                      category={itemData.item.categoryIds}
                      title={itemData.item.title}
                      price={itemData.item.price}
                      oldPrice={itemData.item.oldPrice}
                      description={itemData.item.description}
                      
                      onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                      }}
                    />
                  )}
              />
          </View>
      </View>
  )
};

CategoriesScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Product Catgories',
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
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default CategoriesScreen;