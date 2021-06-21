import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Avatar, Banner, Card, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Carousel from '../../components/UI/Carousel';
import OptionItem from '../../components/UI/OptionItem';

import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

const HeaderComponent = (yourProps) => (
  <View>     
    <View style={styles.headerContainer}>
      <Card>
        <Card.Title
          title="MI Store App"
          subtitle="INDIA"
          left={ (props) => <Image 
              source={require('../../assets/icons/india.png')} 
              style={{ width: 40, resizeMode: 'contain' }} 
            /> 
          }
        />
        <Carousel
          style='slide'
          items={[{
            carouselImage: 'https://i02.appmifile.com/846_operator_in/02/06/2021/291f5f00960d3b173383b7b141df38ff.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/326_operator_in/02/06/2021/6937e17edeceaea2c17660e1d816c416.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/396_operator_in/04/06/2021/4a231e8dcaf72fb7e36b829faa52239f.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/106_operator_in/04/06/2021/5a3da64970ce953455aa9f63f42c089d.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/955_operator_in/04/06/2021/ddb88c3f9e4e31c6f792e32adfeb30d1.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/232_operator_in/04/06/2021/568c8fd7c3c4368c14c8ef64cda7866b.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/417_operator_in/04/06/2021/36c1c9f10ac411c5ba304d30d60ca234.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/645_operator_in/02/06/2021/4e32c24cfdf8c48ad1bc911807cac09e.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/964_operator_in/04/06/2021/2b123faeb55da7fdfb8a5b61573b1561.jpg',
          }]}
        />
      </Card>
    </View>
    <View style={styles.subContainer}>
      <Card style={{ width: '90%' }}>
        <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 2 }}>
          <OptionItem
            icon='phone-portrait-outline'
            color='#D6EAF8'
            label='Phones'
            onPress={() => {
              yourProps.navigation.navigate({
                routeName: 'CategoryProducts',
                params: {
                  categoryIds: 'c1'
                }
              })
            }}
          />
          <OptionItem
            icon='tv-outline'
            color='#D4EFDF'
            label='TV'
            onPress={() => {
              yourProps.navigation.navigate({
                routeName: 'CategoryProducts',
                params: {
                  categoryIds: 'c2'
                }
              })
            }}
          />
          <OptionItem
            icon='laptop-outline'
            color='#FADBD8'
            label='Laptop'
            onPress={() => {
              yourProps.navigation.navigate({
                routeName: 'CategoryProducts',
                params: {
                  categoryIds: 'c3'
                }
              })
            }}
          />
          <OptionItem
            icon='headset-outline'
            color='#E8DAEF'
            label='Audio'
            onPress={() => {
              yourProps.navigation.navigate({
                routeName: 'CategoryProducts',
                params: {
                  categoryIds: 'c6'
                }
              })
            }}
          />
          <OptionItem
            icon='watch-outline'
            color='#FCF3CF'
            label='Wearables'
            onPress={() => {
              yourProps.navigation.navigate({
                routeName: 'CategoryProducts',
                params: {
                  categoryIds: 'c5'
                }
              })
            }}
          />
        </View>
      </Card>
    </View>
    <View>
      <Card>
        <Card.Cover 
          source={{ uri: 'https://i02.appmifile.com/853_operator_in/30/05/2021/3885beb0c45722f57e97569a08ebbce3.png' }} 
          onPress={ ()=> {} }
        />
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://i02.appmifile.com/504_operator_in/28/04/2021/888643e2de1ff708450b0e4a4ba8aff2.png' }} />
      </Card>
    </View>
  </View>
)

const footerComponent = () => (
  <View>
    <View style={styles.headerContainer}>
      <Card>
        <Carousel
          style='slide'
          items={[{
            carouselImage: 'https://i02.appmifile.com/708_operator_in/10/05/2021/2b7fc56c3b3c44f4b11bd9bd2b255749.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/191_operator_in/10/05/2021/4ccd175347800225dd6b47eb35166e2e.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/52_operator_in/15/03/2021/7f91bdb2f227f8bd679fa96ac2a9fc1f.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/107_operator_in/17/03/2021/fa9bab9cbad1629076b04a17a655559c.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/85_operator_in/11/01/2021/b7600815ae26854c451a39ee88431098.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/108_operator_in/13/01/2021/3bfe5123ede27524d616f0bdaf43945a.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/843_operator_in/28/12/2020/226c73c386cf35e47fa0079b3534085f.jpg',
          }, {
            carouselImage: 'https://i02.appmifile.com/779_operator_in/28/12/2020/55bbda7ebbb47f674213dead3c0fefdf.jpg',
          }, {
            carouselImage: 'https://i01.appmifile.com/webfile/globalimg/in/cms/97E65ECC-E105-9A20-6BD7-8A3235104C57.jpg',
          }, {
            carouselImage: 'https://i01.appmifile.com/webfile/globalimg/in/cms/40F52E34-A946-E8B3-29F2-BBE4A5C7BEEE.jpg',
          }]}
        />
      </Card>
    </View>
    <View style={styles.footer}>
    <Card>
      <Card.Cover source={{ uri: 'https://i01.appmifile.com/webfile/globalimg/xm_event/in/2020-06-05/newarrivalsstrip.png' }} />
    </Card>
    <View style={styles.follow}>
      <Icon
        name="logo-youtube"
        size={20}
        onPress={() => {
          console.log('Github')
        }}
      />
      <Icon
        name="logo-github"
        size={20}
        onPress={() => {
          console.log('Github')
        }}
      />
      <Icon
        name="logo-instagram"
        size={20}
        onPress={() => {
          console.log('Github')
        }}
      />
      <Icon
        name="logo-facebook"
        size={20}
        onPress={() => {
          console.log('Github')
        }}
      />
      <Icon
        name="logo-twitter"
        size={20}
        onPress={() => {
          console.log('Github')
        }}
      />
    </View>
    <View style={styles.copyright}>    
      <Text style={{ fontSize: 16, color: Colors.secondaryTextColor }}>Copyright {'\u00A9'} 2021. All Rights Reserved</Text>
      <Text style={{ fontSize: 14, color: Colors.secondaryTextColor }}>🚀 Developed in India</Text>
    </View>
  </View>
  </View>
  
)

const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  
  const products = useSelector(state => state.products.availableProducts);
  
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

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <HeaderComponent navigation={props.navigation} />}
      ListFooterComponent={footerComponent}
      
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
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Search"
          iconName="search-outline"
          onPress={() => {
            console.log('Search')
            navData.navigation.navigate('Search')
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
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  follow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 90,
    marginTop: 10
  },
  copyright: {    
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default ProductOverviewScreen;